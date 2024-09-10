import os
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image

# Charger le modèle
model = load_model('phone_classifier.h5')  # Assurez-vous que le modèle est nommé correctement

# Fonction pour prédire la classe d'une nouvelle image
def predict_phone(image_path, model):
    if not os.path.exists(image_path):
        print(f"File not found: {image_path}")
        return None
    img = image.load_img(image_path, target_size=(128, 128))  # Adapter la taille d'image à celle utilisée lors de l'entraînement
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0) / 255.0  # Normalisation de l'image
    predictions = model.predict(img_array)
    predicted_class = np.argmax(predictions[0])
    return predicted_class

# Spécifiez le chemin de l'image que vous souhaitez prédire
image_path = 'test_images/50.jpg'  # Remplacez par le chemin de votre image à tester
predicted_class = predict_phone(image_path, model)

if predicted_class is not None:
    # Mapper les indices de classes aux noms des téléphones
    class_indices = {'iphone': 0, 'macbook': 1, 'samsung': 2}  # Indices de classes correspondant aux marques
    class_names = list(class_indices.keys())

    print(f'Predicted phone brand: {class_names[predicted_class]}')
