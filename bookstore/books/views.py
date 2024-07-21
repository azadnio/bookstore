from django.shortcuts import render
from rest_framework import views, status
from rest_framework.response import Response
from .serializers import BookSerializer

class BookStorage:
    def __init__(self):
        self.books = {
            1: {
                'id': 1,
                'title': 'Django for APIs',
                'author': 'William S. Vincent',
                'publication_date': '2019-03-20'
            },
            2: {
                'id': 2,
                'title': 'Django for Professionals',
                'author': 'William S. Vincent',
                'publication_date': '2020-07-20'
            },
        }
        self.next_id = 3

    def add_book(self, book):
        book['id'] = self.next_id
        self.books[self.next_id] = book
        self.next_id += 1
        return book

    def get_book(self, book_id):
        return self.books.get(book_id)

    def get_books(self):
        return self.books

    def update_book(self, book_id, book):
        if book_id in self.books:
            book['id'] = book_id
            self.books[book_id] = book
            return book
        return None

    def delete_book(self, book_id):
        if book_id in self.books:
            book = self.books[book_id]
            del self.books[book_id]
            return book
        return None
    
storage = BookStorage()

class BookListCreateAPIView(views.APIView):
    def get(self, request):
        books = storage.get_books()
        serializer = BookSerializer(books.values(), many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = BookSerializer(data=request.data)
        if serializer.is_valid():
            book = storage.add_book(serializer.validated_data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class BookRetrieveUpdateDestroyAPIView(views.APIView):
    def get(self, request, book_id):
        book = storage.get_book(book_id)
        if book:
            serializer = BookSerializer(book)
            return Response(serializer.data)
        return Response(status=status.HTTP_404_NOT_FOUND)

    def put(self, request, book_id):
        book = storage.get_book(book_id)
        if book:
            serializer = BookSerializer(data=request.data)
            if serializer.is_valid():
                book = storage.update_book(book_id, serializer.validated_data)
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, book_id):
        book = storage.delete_book(book_id)
        if book:
            serializer = BookSerializer(book)
            return Response(serializer.data)
        return Response(status=status.HTTP_404_NOT_FOUND)
    
