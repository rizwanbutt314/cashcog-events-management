from .models import Events
from .serializers import EventsSerializer
from rest_framework import mixins, generics, filters, status


class EventsAPIIndex(mixins.ListModelMixin,
                     mixins.CreateModelMixin,
                     generics.GenericAPIView):
    serializer_class = EventsSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    search_fields = ('category',)

    def get_queryset(self):
        return Events.objects.filter(status=Events.PENDING)

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class EventsAPIDetail(mixins.UpdateModelMixin,
                      generics.GenericAPIView):
    serializer_class = EventsSerializer
    queryset = Events.objects.all()

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)
