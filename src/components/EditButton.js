import React from "react";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Badge, ButtonBase, IconButton } from "@material-ui/core";
import TouchRipple from "@material-ui/core/ButtonBase/TouchRipple.js";
//Icons
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
    badge: {
        borderRadius: "30px",
        height: "30px",
    },
}));

export const EditButton = (props) => {
    const {} = props;
    const classes = useStyles();
    const [edit, setEdit] = React.useState(false);

    const toggleEdit = () => {
        setEdit((prevState) => !prevState);
    };

    return (
        <Grid container>
            <Grid item>
                <Badge
                    badgeContent={
                        <IconButton
                            style={{ padding: 0 }}
                            onClick={(e) => toggleEdit()}
                        >
                            <EditIcon
                                fontSize="small"
                                style={{ color: "black" }}
                            />
                        </IconButton>
                    }
                    color="primary"
                    style={{
                        flex: "0 0 auto",
                        borderRadius: "30px",
                        overflow: "visible",
                    }}
                    classes={{ badge: classes.badge }}
                >
                    {React.Children.map(props.children, (child, index) => {
                        if (React.isValidElement(child)) {
                            return React.cloneElement(child, {
                                edit: edit,
                            });
                        }
                        return child;
                    })}
                </Badge>
            </Grid>
        </Grid>
    );
};
