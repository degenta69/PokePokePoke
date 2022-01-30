import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { useRecoilState, useRecoilValue } from "recoil";
import popUpShow from "../../Atoms/popUpShow";
import pokemonFromList from "../../Atoms/pokemonFromList";
import "./PokemonDetail.css"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "max-content",
  //   bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function PokemonDetail() {
  const [open, setOpen] = useRecoilState(popUpShow);
  const pokemon = useRecoilValue(pokemonFromList);
  const handleClose = () => setOpen(false);
  console.log(pokemon);
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style} className={`poke-${pokemon.types[0].type.name} detail-box-main`}>
            <Typography
              className="text-uppercase"
              id="transition-modal-title"
              variant="h6"
              component="h2"
            >
              {pokemon.name}
            </Typography>
            <Box className="d-flex detail-box" sx={{ display: "flex", alignItems: "center" }}>
              <img
                className={`poke-detail-svg`}
                style={{
                  objectFit: "contain",
                }}
                src={pokemon.sprites.other.dream_world.front_default}
                alt={pokemon.name}
              />
              <Box className="d-flex flex-column-reverse justify-content-between">
                {pokemon.stats.map((stat, index) => {
                  return (
                    <Box key={index} className="d-flex justify-content-between">
                      <Typography
                        className="text-uppercase stat-name-para"
                        id="transition-modal-description"
                        sx={{
                          mt: 2,
                          ml: "auto",
                          fontWeight: 900,
                          fontSize: "0.8rem",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {stat.stat.name}:
                      </Typography>
                      <Typography
                        className="stat-para"
                        id="transition-modal-description"
                        sx={{ mt: 2 }}
                      >
                        {stat.base_stat}
                      </Typography>

                      <input
                        type="range"
                        min="0"
                        readOnly
                        max="100"
                        value={stat.base_stat}
                        name="stats"
                        id=""
                      />
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
