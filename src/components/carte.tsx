import React, { useState, useEffect } from 'react';
import dessusCarte from '/dessus-carte.svg';
import { Card, CardMedia, Grid2 as Grid } from '@mui/material';
import { DonneeCarte } from '../utils/donneesCarte';
import { set } from 'lodash';

/**
 * Paramètres de la carte
 */
interface CarteProps {
    carte: DonneeCarte;
    tourne: boolean;
    onTourne: (carte: DonneeCarte) => void;
}


  
const Carte: React.FC<CarteProps> = ({carte, tourne, onTourne}) => {
    const [estTourne, setTourne] = useState<boolean>(carte.tourne);
    return (    
        <Card > 
            <Grid container spacing={0} direction="column" alignItems="center" >
                <CardMedia
                image={tourne ? carte.image: dessusCarte }
                onClick={() => {onTourne(carte); setTourne(true);}}
                className={tourne ? "carteAffichee" : "carteCachee"}
                sx={{ height: 150, width: 150 }}
                />
            </Grid>
            
    </Card>
      );
};

export default Carte;