import React from "react";
import "./styles.css";

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

function LoggedInUsers({ currentRoom }) {
  const images_colleges = {
    CMB: { image: IMAGE_CMB },
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
    CMJF: { image: IMAGE_CMVM },
    CMS: { image: IMAGE_CMVM },
    FORJ: { image: IMAGE_CMVM }
  }

  const hasUsers = currentRoom && currentRoom.users && currentRoom.users.length > 0;

  return (
    <>
      {hasUsers && (
        <div className="colleges-container">
          <p>Usuários conectados</p>

          <div className="all-colleges">
            {currentRoom.users.map((user) => (
              <div className="college">
                <img src={images_colleges[user.studentId].image} alt="college" />
                <span>{user.studentId}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>

  )
}

export default LoggedInUsers;