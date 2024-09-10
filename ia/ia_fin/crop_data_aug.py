import os
import cv2
import xml.etree.ElementTree as ET
from imgaug import augmenters as iaa
from imgaug.augmentables.bbs import BoundingBox, BoundingBoxesOnImage

def augment_dataset(image_folder, annotation_folder, output_images_folder, output_annotation_folder):
    seq = iaa.Sequential([
        iaa.Fliplr(0.5),  # Flip horizontalement avec une probabilité de 50%
        iaa.Affine(rotate=(-10, 10)),  # Rotation entre -10 et 10 degrés
        iaa.GaussianBlur(sigma=(0, 1.0)),  # Appliquer un flou gaussien
        iaa.Multiply((0.5, 1.5), per_channel=0.5),  # Modifier l'intensité des couleurs
        iaa.LinearContrast((0.75, 1.5), per_channel=0.5),  # Changer le contraste
    ], random_order=True)

    for filename in os.listdir(image_folder):
        if filename.endswith(".jpg"):
            image_path = os.path.join(image_folder, filename)
            
            # Utilise le même nom de fichier sans "_cropped" pour les annotations
            base_filename = filename.replace("_cropped", "").replace(".jpg", "")
            annotation_filename = f"{base_filename}.xml"
            annotation_path = os.path.join(annotation_folder, annotation_filename)

            # Vérification et affichage des chemins
            print(f"Vérification du fichier image: {image_path}")
            print(f"Vérification du fichier annotation: {annotation_path}")

            # Vérifie si l'annotation existe
            if not os.path.exists(annotation_path):
                print(f"Annotation manquante pour {filename}: {annotation_path}")
                continue  # Passe à l'image suivante

            image = cv2.imread(image_path)
            annotation_tree = ET.parse(annotation_path)
            annotation_root = annotation_tree.getroot()

            # Augmentation de l'image et des annotations
            image_aug, annotation_aug = augment_image_and_annotation(image, annotation_root, seq)

            # Sauvegarde de l'image augmentée
            output_image_path = os.path.join(output_images_folder, filename)
            output_annotation_path = os.path.join(output_annotation_folder, annotation_filename)
            cv2.imwrite(output_image_path, image_aug)
            annotation_tree.write(output_annotation_path)

def augment_image_and_annotation(image, annotation_root, seq):
    bboxes = []
    for obj in annotation_root.findall('object'):
        bndbox = obj.find('bndbox')
        xmin = int(bndbox.find('xmin').text)
        ymin = int(bndbox.find('ymin').text)
        xmax = int(bndbox.find('xmax').text)
        ymax = int(bndbox.find('ymax').text)
        bboxes.append(BoundingBox(xmin, ymin, xmax, ymax))

    bbs = BoundingBoxesOnImage(bboxes, shape=image.shape)
    
    # Appliquer les augmentations à l'image et aux boîtes englobantes
    image_aug, bbs_aug = seq(image=image, bounding_boxes=bbs)

    # Mettre à jour les annotations avec les nouvelles boîtes englobantes
    for i, obj in enumerate(annotation_root.findall('object')):
        bndbox = obj.find('bndbox')
        bndbox.find('xmin').text = str(int(bbs_aug.bounding_boxes[i].x1))
        bndbox.find('ymin').text = str(int(bbs_aug.bounding_boxes[i].y1))
        bndbox.find('xmax').text = str(int(bbs_aug.bounding_boxes[i].x2))
        bndbox.find('ymax').text = str(int(bbs_aug.bounding_boxes[i].y2))

    return image_aug, annotation_root

# Exécution de l'augmentation pour chaque catégorie
augment_dataset('cropped_images/iphone', 'annotation/iphone', 'cropped_images_augmentation/iphone', 'augmentation_annotation/iphone')
augment_dataset('cropped_images/macbook', 'annotation/macbook', 'cropped_images_augmentation/macbook', 'augmentation_annotation/macbook')
augment_dataset('cropped_images/samsung', 'annotation/samsung', 'cropped_images_augmentation/samsung', 'augmentation_annotation/samsung')
