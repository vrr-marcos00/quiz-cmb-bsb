import React from 'react';
import './styles.css';

/**
 * Images
 */
import IMAGE_CMB from "../../../../assets/images/CMB.png";
import IMAGE_CMBEL from "../../../../assets/images/CMBel.png";
import IMAGE_CMBH from "../../../../assets/images/CMBH.png";
import IMAGE_CMC from "../../../../assets/images/CMC.png";
import IMAGE_CMCG from "../../../../assets/images/CMCG.png";
import IMAGE_CMM from "../../../../assets/images/CMM.png";
import IMAGE_CMPA from "../../../../assets/images/CMPA.png";
import IMAGE_CMR from "../../../../assets/images/CMR.png";
import IMAGE_CMRJ from "../../../../assets/images/CMRJ.png";
import IMAGE_CMSM from "../../../../assets/images/CMSM.png";
import IMAGE_CMSP from "../../../../assets/images/CMSP.png";
import IMAGE_CMVM from "../../../../assets/images/CMVM.png";
import IMAGE_FORJ from "../../../../assets/images/FORJ.png";
import IMAGE_CMS from "../../../../assets/images/CMS.png";
import IMAGE_CMJF from "../../../../assets/images/CMJF.png";

function Background() {
  const [collegeName, setCollegeName] = React.useState('');

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
    CMJF: { image: IMAGE_CMJF },
    CMS: { image: IMAGE_CMS },
    FORJ: { image: IMAGE_FORJ }
  };

  React.useEffect(() => {
    const studentId = localStorage.getItem('studentId');
    setCollegeName(studentId);
  }, []);

  console.log(collegeName);

  return (
    <div className="background-question-student">
      {collegeName && (
        <div className="icon-college-float">
          <img src={images_colleges[collegeName].image} alt="collegeName" />
          <p>{collegeName}</p>
        </div>

      )}

    </div>
  );
}

export default Background;