import React from "react";
import Typography from "@material-ui/core/Typography";
import { IconButton } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { removeFav } from "../redux/actions";
import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";
import Tooltip from "@material-ui/core/Tooltip";

const Favs = () => {
  const favoritos = useSelector((store) => store.favoritos);

  const dispatch = useDispatch();

  return (
    <div
      style={{
        position: "absolute",
        width: "330px",
        height: "auto",
        borderRadius: "2px",
        backgroundColor: "#ED1D24",
        top: "30px",
        right: "30px",
        zIndex: "100",
      }}
    >
      <Typography style={{ color: "white" }} align="center" variant="h6">
        FAVORITOS
      </Typography>

      {favoritos.length === 0 ? (
        <h5
          style={{
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ¡ AGREGA TUS HEROES FAVORITOS !{" "}
        </h5>
      ) : (
        favoritos.map((el) => (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "5px",
            }}
          >
            {" "}
            <img
              src={el.image}
              style={{
                marginRight: "15px",
                height: "35px",
                width: "35px",
                borderRadius: "50%",
              }}
              alt=""
            />
            <p style={{ color: "white" }}> {el.name}</p>
            <Tooltip placement="right" arrow title="QUITAR">
              <IconButton
                onClick={() => dispatch(removeFav(el.id))}
                color="primary"
              >
                <HighlightOffRoundedIcon style={{ color: "white" }} />
              </IconButton>
            </Tooltip>
          </div>
        ))
      )}
    </div>
  );
};

export default Favs;
