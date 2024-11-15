/**
 * Classe pour représenter les données des cartes
 */
export class DonneeCarte {
    id: number;
    image: string;
    nom: string;
    tourne: boolean;
    constructor(id: number,image: string,nom: string,tourne: boolean) {
        this.id = id;
        this.image = image;
        this.nom = nom;
        this.tourne = tourne;
    }
}

const donnees = [
    new DonneeCarte(1, "/chat1.png", "chat1", false),
    new DonneeCarte(2, "/chat1.png", "chat1", false),
    new DonneeCarte(3, "/chat2.png", "chat2", false),
    new DonneeCarte(4, "/chat2.png", "chat2", false),
    new DonneeCarte(5, "/chat3.png", "chat3", false),
    new DonneeCarte(6, "/chat3.png", "chat3", false),
    new DonneeCarte(7, "/chat4.png", "chat4", false),
    new DonneeCarte(8, "/chat4.png", "chat4", false),
    new DonneeCarte(9, "/chat5.png", "chat5", false),
    new DonneeCarte(10, "/chat5.png", "chat5", false),
    new DonneeCarte(11, "/chat6.png", "chat6", false),
    new DonneeCarte(12, "/chat6.png", "chat6", false),
    new DonneeCarte(13, "/chat7.png", "chat7", false),
    new DonneeCarte(14, "/chat7.png", "chat7", false),
    new DonneeCarte(15, "/chat8.png", "chat8", false),
    new DonneeCarte(16, "/chat8.png", "chat8", false),
]
/**
 * Mélanger les cartes
 * @returns Array de cartes mélangées
 */
export const obtenirCartesMelangees = () => {
    var tableauCartes = donnees.sort(() => Math.random() - 0.5);
    console.log("tableau : " + tableauCartes.toString());
    return tableauCartes;
};