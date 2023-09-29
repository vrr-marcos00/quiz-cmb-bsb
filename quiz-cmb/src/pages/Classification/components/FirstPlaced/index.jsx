import React from 'react';
import './styles.css';

/**
 * Images
 */
import IMAGE_CMB from '../../../../assets/images/CMB.png';
import IMAGE_CMBEL from '../../../../assets/images/CMBel.png';
import IMAGE_CMBH from '../../../../assets/images/CMBH.png';
import IMAGE_CMC from '../../../../assets/images/CMC.png';
import IMAGE_CMCG from '../../../../assets/images/CMCG.png';
import IMAGE_CMM from '../../../../assets/images/CMM.png';
import IMAGE_CMPA from '../../../../assets/images/CMPA.png';
import IMAGE_CMR from '../../../../assets/images/CMR.png';
import IMAGE_CMRJ from '../../../../assets/images/CMRJ.png';
import IMAGE_CMSM from '../../../../assets/images/CMSM.png';
import IMAGE_CMSP from '../../../../assets/images/CMSP.png';
import IMAGE_CMVM from '../../../../assets/images/CMVM.png';
import logoQuiz from '../../../../assets/images/logo_quiz.png';


function FisrtPlaced() {

  const arrayColleges = ["CMB", "CMBEL", "CMBH", "CMC", "CMCG", "CMF", "CMM", "CMPA", "CMR", "CMRJ", "CMSM", "CMSP", "CMVM", "CMVM0", "CMVM1", "CMVM2"];

  const classification = [
    {
      name: "CMB",
      points: 15,
    },
    {
      name: "CMBEL",
      points: 18,
    },
    {
      name: "CMBH",
      points: 20,
    },
    {
      name: "CMC",
      points: 22,
    },
    {
      name: "CMCG",
      points: 2,
    },
    {
      name: "CMF",
      points: 2,
    },
    { 
      name: "CMM",
      points: 5,
    },
    {
      name: "CMPA",
      points: 5,
    },
    {
      name: "CMR",
      points: 70,
    },
    {
      name: "CMRJ",
      points: 50,
    },
    {
      name: "CMSM",
      points: 5,
    },
    {
      name: "CMSP",
      points: 2,
    },
    {
      name: "CMVM",
      points: 21,
    },
    {
      name: "CMVM0",
      points: 12
    },
    {
      name: "CMVM1",
      points: 30
    },
    {
      name: "CMVM2",
      points: 11
    }
  ];

  const sortPlayers = classification.sort((a, b) => {
    return b.points - a.points;
  });

  const images_colleges = {
    CMB: { image: IMAGE_CMB},
    CMBEL: { image: IMAGE_CMBEL },
    CMBH: { image: IMAGE_CMBH },
    CMC: { image: IMAGE_CMC },
    CMCG: { image: IMAGE_CMCG },
    CMF: { image: IMAGE_CMCG },
    CMM: { image: IMAGE_CMM },
    CMPA: { image: IMAGE_CMPA },
    CMR: { image: IMAGE_CMR },
    CMRJ: { image: IMAGE_CMRJ },
    CMSM: { image: IMAGE_CMSM },
    CMSP: { image: IMAGE_CMSP },
    CMVM: { image: IMAGE_CMVM },
    CMVM0: { image: IMAGE_CMVM },
    CMVM1: { image: IMAGE_CMVM },
    CMVM2: { image: IMAGE_CMVM }
  }

  const addClassThreeFirsts = ["first-player", "second-player", "third-player"];

  return (
    < div className='first-placed-row'>
      <span className="classification-title">Classificação</span>
      {sortPlayers.map((player, index) => {
        return (
          <div className={`first-placed ${addClassThreeFirsts[index]}`} key={index}>
            <div className="first-placed-position">
              <span>{index + 1}º</span>
            </div>
            <div className="first-placed-college">
              <img src={images_colleges[player.name].image} alt={player.name} />
              <span>{player.name}</span>
            </div>
            <div className="first-placed-points">
              <span>{player.points} pts</span>
            </div>
          </div>
        )
      })}
    </div >
  );
}

export default FisrtPlaced;