import React, { useState, useEffect } from 'react';
import { Container, Snackbar, Alert, Button, Box, Grid, Card, CardMedia} from '@mui/material';
import * as _ from "lodash";
import { obtenirCartesMelangees, DonneeCarte } from '../utils/donneesCarte';
import Carte from './carte';
/**
 * Component qui contrôle le jeu
 * @returns 
 */
const Jeu: React.FC = () => {
    const [essais, setEssais] = useState<number>(20);
    const [cartes, setCartes] = useState<DonneeCarte[]>([]);
    const [premiereCarte, setPremiereCarte] = useState<DonneeCarte>();
    const [deuxiemeCarte, setDeuxiemeCarte] = useState<DonneeCarte>();
    const [finPartie, setFinPartie] = useState<boolean>(false);
    const [peutSelectionner, setPeutSelectionner] = useState<boolean>(true);
    const [message, setMessage] = useState<{
      text: string;
      severity: 'success' | 'error';
    } | null>(null);
    
    // Au début du jeu, initialiser la liste des cartes
    useEffect(() => {
        console.log("debut du jeu");
      setCartes(obtenirCartesMelangees());
      setPeutSelectionner(true);
    }, []);
    
    // Après chaque essai, vérifier si on a gagné ou dépassé la limite d'essais
    useEffect(() => {
        verifierDernierEssai();
    }, [essais]);
  
    const verifierDernierEssai = () => {
        //Parcourir les cartes pour voir si elles ont toutes été affichées
        var gagne = true;
        for (var i = 0; i < cartes.length; i++) {
            if (cartes[i].tourne == false) {
                gagne = false;
            }
        }

        if (gagne) {
            setFinPartie(true);
            setMessage({
            text: 'Félicitations ! Vous avez gagné!',
            severity: 'success',
            });
        }
        else if (essais <= 0) {
            setFinPartie(true);
            setMessage({
            text: "Dommage ! Vous avez perdu",
            severity: 'error',
            });
        }
    };
    
    // Après chaque selection de carte, vérifier si elles sont égales
    useEffect(() => {
        //Si la deuxième carte a été sélectionnée, sinon on fait rien
        if (premiereCarte != undefined && deuxiemeCarte != undefined) {
            console.log("deux cartes");
            if (premiereCarte.nom == deuxiemeCarte.nom) {
                console.log("pareilles");
                //Recréer l'array des cartes mais avec les cartes tournées cette fois-ci
                setCartes((vieillesValeurs) => {
                    //Pour toutes les cartes, si une d'entre elles a le même id que les cartes actuelles, les tourner
                    return vieillesValeurs.map((laCarte) => {
                        if (laCarte.id == premiereCarte.id || laCarte.id == deuxiemeCarte.id) {
                            return {...laCarte, tourne: true};
                        }
                        else {
                            return laCarte;
                        }
                    })
                })

            }

            setTimeout(() => { 
                setPremiereCarte(undefined);
                setDeuxiemeCarte(undefined);
                setPeutSelectionner(true);
            }, 1000); 
            setEssais(essais - 1);
            
           
        }
    }, [premiereCarte, deuxiemeCarte]);

    //Sélectionner une carte
    const selectionnerCarte = (laCarte: DonneeCarte) => {
        if (finPartie == false && peutSelectionner == true) {
            if (premiereCarte == undefined) {
                setPremiereCarte(laCarte);
            }
            //Si on a déjà une première carte, ne pas pouvoir la re-sélectionner
            else if (premiereCarte != undefined && premiereCarte.id != laCarte.id) {
                setDeuxiemeCarte(laCarte);
                setPeutSelectionner(false);
            }
        }
        
    };
    
    const recommencerPartie = () => {
        setCartes(obtenirCartesMelangees());
        setEssais(20);
        setPremiereCarte(undefined);
        setDeuxiemeCarte(undefined);
        setFinPartie(false);
        setPeutSelectionner(true);
        setMessage({text:"Recommencé!", severity: 'success'});
    }
    console.log("cartes :" + cartes.length)
    /*
    <Grid>
            {cartes.map((carte) => ( 
                <Card sx={{ width: 400 }}> 
                <Grid container spacing={1} direction="column" alignItems="center" >
                    <CardMedia
                    image={carte.tourne ? carte.image: dessusCarte }
                    onClick={() => selectionnerCarte(carte)}
                    className={carte.tourne ? "carteAffichee" : "carteCachee"}
                    sx={{ height: 150, width: 150, borderRadius: '50%' }}
                    />
                </Grid>
                
                </Card>
            )) }
        </Grid>


        <GrilleCartes
          cartes={cartes}
          onTourne={(carte) => selectionnerCarte(carte)}
        />
        */
        var cartesASeparer = cartes;
        var rangees = _.chunk(cartesASeparer, 4);
    return (
      <Container maxWidth="sm" sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', width:"1000px"}}>
        
        <Box sx={{display: 'flex', gap: 0 }}>
            Nombre d'essais restants : {essais}
        </Box>
        
        <Grid container spacing={3} maxWidth="sm" sx={{ marginTop: 2, width:"max"}} >
            {rangees.map((row, rowIndex) => (
                <Grid  container item spacing={3} key={rowIndex} >
                {row.map((laCarte, index) => (
                    <Grid item xs={3}  key={index} sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'center'}}>
                        <Carte
                        carte={laCarte}
                        tourne={laCarte.tourne || laCarte === premiereCarte || laCarte === deuxiemeCarte}
                        onTourne={(carte) => selectionnerCarte(carte)}
                        />
                    </Grid>
                ))}
        </Grid>
         ))}
        </Grid>
        
        {message && (
          <Snackbar open autoHideDuration={6000} onClose={() => setMessage(null)}>
            <Alert
              onClose={() => setMessage(null)}
              severity={message.severity}
              sx={{ width: '100%' }}
            >
              {message.text}
            </Alert>
          </Snackbar>
        )}
        <Box sx={{display: 'flex', gap: 0 }}>
          <Button variant="contained" onClick={recommencerPartie}>
            Redémarrer la partie
          </Button>
        </Box>
        
      </Container>
    );
  };
  
export default Jeu;
  