import os
import numpy as np
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

# Charger le modèle
model_path = r'C:\Users\marhr\Desktop\MyStore\ia\ia_fin\phone_classifier.h5'
model = load_model(model_path)


@csrf_exempt
@api_view(['POST'])
def predict_phone(request):
    # Check if a file is included in the POST request
    if 'image' not in request.FILES:
        return Response({'error': 'No image provided'}, status=status.HTTP_400_BAD_REQUEST)

    image_file = request.FILES['image']

    # Sauvegarder l'image temporairement
    image_path = 'temp_image.jpg'
    try:
        with open(image_path, 'wb') as f:
            for chunk in image_file.chunks():
                f.write(chunk)
    except Exception as e:
        return Response({'error': f'Failed to save the image: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Predict the class of the phone
    predicted_class = predict_phone_from_path(image_path, model)

    if predicted_class is not None:
        # Mapper les indices de classes aux noms des téléphones (ajuster les noms selon votre cas)
        class_indices = {'iphone': 0, 'macbook': 1, 'samsung': 2}
        class_names = list(class_indices.keys())

        try:
            predicted_phone = class_names[predicted_class]
            print(predicted_phone)
            return Response({'predicted_phone': predicted_phone}, status=status.HTTP_200_OK)
        except IndexError:
            return Response({'error': 'Predicted class out of index range'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        return Response({'error': 'Failed to predict phone'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


def predict_phone_from_path(image_path, model):
    if not os.path.exists(image_path):
        print(f"File not found: {image_path}")
        return None

    try:
        # Load and preprocess the image
        img = image.load_img(image_path, target_size=(128, 128))  # Resize image to (128, 128)
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0) / 255.0  # Normalize the image
        predictions = model.predict(img_array)
        predicted_class = np.argmax(predictions[0])
        return predicted_class
    except Exception as e:
        print(f"Error during prediction: {str(e)}")
        return None
