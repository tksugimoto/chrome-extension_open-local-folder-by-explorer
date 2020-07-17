# Extension Chrome pour ouvrir un dossier local dans l'explorateur de Chrome

## Fonction
- Ouvrez le dossier dans Explorer
- (Pour les fichiers) Ouvrez le dossier parent dans l'explorateur avec le fichier sélectionné.


## Dossiers et fichiers ciblés
- Onglet courant (si l'URL commence par "fichier://`)
- L'URL du lien (si l'URL commence par "file://`)
- Chaîne de sélection (la chaîne de sélection commence par `C:\\\\, `C:\, `C:ComputerName`, etc.) (condition)
    - Ignorez les guillemets de début et de fin (double guillemets) s'ils sont présents aux deux extrémités (uniquement)


## : avertissement : Notes
Afin de contrôler le côté hôte de Chrome, vous devez faire ce qui suit
- Installation de Node.js
- Modifications du registre


## Déroulement
1. installer l'extension
Configurez-le selon l'onglet "Configuration" ouvert au moment de l'installation.
    - Si vous avez besoin de le reconfigurer, vous pouvez le faire à partir de la page d'options de l'extension
1. dans le menu contextuel d'une page, d'un lien ou d'un texte sélectionné, cliquez sur "Ouvrir ~~ dans l'explorateur". Sélectionnez le "-
    - Ouvrez le dossier dans Explorer
    - Ouvrez le lien dans Explorer (pour un fichier local)
    - Ouvrez la chaîne sélectionnée dans l'explorateur (pour le chemin d'accès au fichier local)

### Changer le titre du menu du clic droit
#### Avantages
Si vous le changez en alphabétique, vous pouvez le sélectionner avec le clavier

#### Comment changer
1. Ouvrez la page des paramètres (page d'options)
Nouveaux titres pour chaque type de menu (clic-droit) dans la section "Changer le titre du menu (clic-droit)".

## Icônes
Nous avons utilisé les icônes Material suivantes qui peuvent être téléchargées à partir de : [icon material download site "icooon-mono"](http://icooon-mono.com/) & [Folder Icons Web graphics Part 2](http://icooon-mono.com/00019-%e3%83%95%e3%82%a9%e3%83%ab%e3%83%80%e3%81%ae%e3%82%a2%e3%82%a4%e3%82%b3%e3%83%b3%e7%b4%a0%e6%9d%90-%e3%81%9d%e3%81%ae2/).
