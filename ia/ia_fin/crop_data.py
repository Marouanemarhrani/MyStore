from PIL import Image
import xml.etree.ElementTree as ET
import os

def crop_images(image_folder, annotation_folder, output_folder):
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    for filename in os.listdir(annotation_folder):
        if filename.endswith(".xml"):
            tree = ET.parse(os.path.join(annotation_folder, filename))
            root = tree.getroot()

            image_filename = root.find('filename').text
            image_path = os.path.join(image_folder, image_filename)
            image = Image.open(image_path)

            for obj in root.findall('object'):
                bndbox = obj.find('bndbox')
                xmin = int(bndbox.find('xmin').text)
                ymin = int(bndbox.find('ymin').text)
                xmax = int(bndbox.find('xmax').text)
                ymax = int(bndbox.find('ymax').text)

                # Rogner l'image selon les coordonnées de la boîte englobante
                cropped_image = image.crop((xmin, ymin, xmax, ymax))

                # Convertir l'image en mode RGB si elle est en RGBA ou autre mode
                if cropped_image.mode != 'RGB':
                    cropped_image = cropped_image.convert('RGB')

                # Sauvegarder l'image rognée en format JPEG
                cropped_image.save(os.path.join(output_folder, f"{filename[:-4]}_cropped.jpg"))

# Exécution pour chaque catégorie
crop_images('dataset/iphone', 'annotation/iphone', 'cropped_images/iphone')
crop_images('dataset/macbook', 'annotation/macbook', 'cropped_images/macbook')
crop_images('dataset/samsung', 'annotation/samsung', 'cropped_images/samsung')
