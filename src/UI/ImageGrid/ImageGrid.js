import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: 20,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    title: {
        color: 'white',
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
}));

const SingleLineGridList = props => {

    const classes = useStyles();
    const images = props.images
    const tileData = [];

    images.map((image, index) => {

        const imageSplited = image.split('|||')
        const imageFile = `data:image/jpg;base64, ${imageSplited[0]}`
            tileData.push({
                img: imageFile,
                title: imageSplited[1],
                author: 'admin'
            })
    })


    return (
        <div className={classes.root}>
            <GridList className={classes.gridList} cols={4} cellHeight={200}>
                {tileData.map((tile) => (
                    <GridListTile key={tile.title}>
                        <img src={tile.img}
                             alt={tile.title} />
                        <GridListTileBar
                            title={tile.title}
                            classes={{
                                root: classes.titleBar,
                                title: classes.title,
                            }}
                            actionIcon={

                                <Button color="primary" onClick={() => props.onClickHandler(tile.title)}>
                                    {props.icon}

                                </Button>
                            }
                        />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
}
export default SingleLineGridList
