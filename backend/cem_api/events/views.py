from .models import Events
from .serializers import EventsSerializer
from cem_api.common.pagination import ApiResultsSetPagination
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import mixins, generics, filters, status


class EventsAPIIndex(mixins.ListModelMixin,
                     mixins.CreateModelMixin,
                     generics.GenericAPIView):
    serializer_class = EventsSerializer
    pagination_class = ApiResultsSetPagination
    filter_backends = (filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend)
    filter_fields = ('currency', 'uuid',)
    search_fields = ('currency', 'employee_first_name', 'employee_last_name')
    ordering_fields = ('created_at', 'amount')
    ordering = ('employee_first_name',)

    def get_queryset(self):
        return Events.objects.filter(status=Events.PENDING)

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class EventsAPIDetail(mixins.RetrieveModelMixin,
                      mixins.UpdateModelMixin,
                      generics.GenericAPIView):
    serializer_class = EventsSerializer
    queryset = Events.objects.all()

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)
