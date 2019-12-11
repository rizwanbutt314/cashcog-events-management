from django.db import models

class Events(models.Model):
    APPROVE = 'A'
    DECLINE = 'D'
    PENDING = 'P'
    EVENT_STATUS_CHOICES = (
        (APPROVE, 'Approve'),
        (DECLINE, 'Decline'),
        (PENDING, 'Pending'),
    )

    uuid = models.CharField(
        max_length=50,
        unique=True,
        help_text="UUID string")
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(blank=True)
    amount = models.IntegerField(blank=True)
    currency = models.CharField(
        max_length=6,
        help_text="Currency")
    employee_uuid = models.CharField(
        max_length=50,
        help_text="Employee uuid")
    employee_first_name = models.CharField(
        max_length=255,
        help_text="Employee frist name")
    employee_last_name = models.CharField(
        max_length=255,
        help_text="Employee last name")
    status = models.CharField(
        max_length=1,
        choices=EVENT_STATUS_CHOICES,
        default=PENDING,
    )
