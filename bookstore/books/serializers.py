from rest_framework import serializers

class BookSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(max_length=100)
    author = serializers.CharField(max_length=100)
    publication_date = serializers.DateField()