from .models import Events
from rest_framework import serializers


class EventsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Events
        fields = '__all__'
        read_only_fields = ['uuid', 'description', 'created_at', 'amount', 'currency', 'employee_uuid',
                            'employee_first_name', 'employee_last_name']
