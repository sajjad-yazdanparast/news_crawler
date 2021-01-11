from rest_framework import serializers

class OrderSerializer(serializers.Serializer) :
    url = serializers.URLField()
    newsCount = serializers.IntegerField()
    startDate = serializers.DateField()
    endDate = serializers.DateField()