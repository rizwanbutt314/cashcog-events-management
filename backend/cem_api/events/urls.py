from django.urls import path, re_path

from . import views

app_name='events'

urlpatterns = [
    re_path(r'^$', views.EventsAPIIndex.as_view(), name="events_listing"),
    re_path(r'^(?P<pk>\d+)/$', views.EventsAPIDetail.as_view(), name="event_detail"),
]