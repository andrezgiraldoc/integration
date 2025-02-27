from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('chart1/', views.chart1_view, name='chart1'),
    path('chart2/', views.chart2_view, name='chart2'),
    path('chart3/', views.chart3_view, name='chart3'),
    path('api/sales-data/', views.sales_data, name='sales_data'),
]