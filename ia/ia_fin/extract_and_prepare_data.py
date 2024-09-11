import os
import xml.etree.ElementTree as ET
from PIL import Image

# Chemins vers les dossiers
base_dir = r'C:\Users\marhr\Desktop\ia_fin'
annotations_dir = os.path.join(base_dir, 'annotation')
images_dir = os.path.join(base_dir, 'dataset')
output_dir = os.path.join(base_dir, 'output')

# Créer les dossiers de sortie si nécessaire
os.makedirs(output_dir, exist_ok=True)

# Liste des fichiers manquants et des fichiers XML invalides
missing_files = []
invalid_xml_files = []

# Parcourir tous les dossiers d'annotations
for phone_folder in os.listdir(annotations_dir):
    phone_path = os.path.join(annotations_dir, phone_folder)
    if os.path.isdir(phone_path):
        for annotation_file in os.listdir(phone_path):
            if annotation_file.endswith('.xml'):
                annotation_path = os.path.join(phone_path, annotation_file)
                
                try:
                    # Parser le fichier XML
                    tree = ET.parse(annotation_path)
                    root = tree.getroot()
                except ET.ParseError:
                    print(f'Fichier XML invalide: {annotation_path}')
                    invalid_xml_files.append(annotation_path)
                    continue
                
                # Obtenir le nom de fichier de l'image
                filename = root.find('filename').text
                image_path = os.path.join(images_dir, phone_folder, filename)
                
                if os.path.exists(image_path):
                    # Charger l'image
                    image = Image.open(image_path)
                    image_width, image_height = image.size
                    
                    # Parcourir les objets annotés dans l'image
                    for obj in root.findall('object'):
                        # Obtenir le nom de phone
                        phone_name = obj.find('name').text
                        
                        # Obtenir les coordonnées de la boîte englobante
                        bndbox = obj.find('bndbox')
                        xmin = int(bndbox.find('xmin').text)
                        ymin = int(bndbox.find('ymin').text)
                        xmax = int(bndbox.find('xmax').text)
                        ymax = int(bndbox.find('ymax').text)
                        
                        # Vérifier et corriger les coordonnées de la boîte englobante
                        xmin = max(0, min(xmin, image_width - 1))
                        ymin = max(0, min(ymin, image_height - 1))
                        xmax = max(0, min(xmax, image_width - 1))
                        ymax = max(0, min(ymax, image_height - 1))
                        
                        if xmin < xmax and ymin < ymax:
                            # Extraire la région d'intérêt (ROI)
                            roi = image.crop((xmin, ymin, xmax, ymax))
                            
                            # Chemin de sauvegarde pour l'extrait
                            phone_output_dir = os.path.join(output_dir, phone_name)
                            os.makedirs(phone_output_dir, exist_ok=True)
                            output_path = os.path.join(phone_output_dir, filename)
                            
                            # Sauvegarder l'extrait
                            roi.save(output_path)
                        else:
                            print(f'Coordonnées invalides pour l\'image {image_path}: ({xmin}, {ymin}, {xmax}, {ymax})')
                else:
                    missing_files.append(image_path)

print('Extraction des empreintes terminée.')
if missing_files:
    print('Les fichiers suivants sont manquants :')
    for file in missing_files:
        print(file)

if invalid_xml_files:
    print('Les fichiers XML suivants sont invalides :')
    for file in invalid_xml_files:
        print(file)
