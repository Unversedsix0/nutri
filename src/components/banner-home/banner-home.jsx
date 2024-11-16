

import Grid from '@mui/material/Unstable_Grid2';

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

const BannerHome = () => (
      <Grid container spacing={3}>
        <Grid xs={12} sm={24} md={48}>
         <Card sx={{ maxWidth: 1600 }}>
            <CardMedia
              component="img"
              height="345"
              image="public/assets/background/nutricionista.jpg"
            />
          </Card>
        </Grid>
      </Grid>
)

export default BannerHome;