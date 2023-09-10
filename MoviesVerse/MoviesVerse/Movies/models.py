from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

class Movie(models.Model):
    title = models.CharField(max_length=200)
    director = models.CharField(max_length=100)
    cast = models.CharField(max_length=500)
    plot_summary = models.TextField()
    release_date = models.DateField()
    runtime_minutes = models.PositiveIntegerField()
    budget = models.DecimalField(max_digits=10, decimal_places=2)
    box_office = models.DecimalField(max_digits=10, decimal_places=2)
    poster = models.ImageField(upload_to='movie_posters/')
    average_rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.00)
    num_ratings = models.PositiveIntegerField(default=0)
    
    def __str__(self):
        return self.title
    
class Rating(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.PositiveIntegerField(choices=[(1, '1'), (2, '2'), (3, '3'), (4, '4'), (5, '5')])
    review = models.TextField(blank=True, null=True)
    timestamp = models.DateTimeField(default = timezone.now)
    
    class Meta:
        unique_together = ('movie', 'user')
    
    def __str__(self):
        return f"{self.user.username} - {self.movie.title}: {self.rating}"


