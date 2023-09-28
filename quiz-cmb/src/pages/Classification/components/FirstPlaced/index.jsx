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


function FisrtPlaced() {

  const arrayColleges = ["CMB", "CMBEL", "CMBH", "CMC", "CMCG", "CMF", "CMM", "CMPA", "CMR", "CMRJ", "CMSM", "CMSP", "CMVM", "CMVM0", "CMVM1", "CMVM2"];

  const images_colleges = {
    CMB: {
      name: 'CMB',
      image: IMAGE_CMB,
      points: 1
    },
    CMBEL: {
      name: 'CMBEL',
      image: IMAGE_CMBEL,
      points: 2
    },
    CMBH: {
      name: 'CMBH',
      image: IMAGE_CMBH,
      points: 3
    },
    CMC: {
      name: 'CMC',
      image: IMAGE_CMC,
      points: 4
    },
    CMCG: {
      name: 'CMCG',
      image: IMAGE_CMCG,
      points: 5
    },
    CMF: {
      name: 'CMF',
      image: '',
      points: 6
    },
    CMM: {
      name: 'CMM',
      image: IMAGE_CMM,
      points: 7
    },
    CMPA: {
      name: 'CMPA',
      image: IMAGE_CMPA,
      points: 8
    },
    CMR: {
      name: 'CMR',
      image: IMAGE_CMR,
      points: 9
    },
    CMRJ: {
      name: 'CMRJ',
      image: IMAGE_CMRJ,
      points: 10
    },
    CMSM: {
      name: 'CMSM',
      image: IMAGE_CMSM,
      points: 11
    },
    CMSP: {
      name: 'CMSP',
      image: IMAGE_CMSP,
      points: 12
    },
    CMVM: {
      name: 'CMVM',
      image: IMAGE_CMVM,
      points: 13
    },
    CMVM0: {
      name: 'CMVM',
      image: IMAGE_CMVM,
      points: 14
    },
    CMVM1: {
      name: 'CMVM',
      image: IMAGE_CMVM,
      points: 15
    },
    CMVM2: {
      name: 'CMVM',
      image: IMAGE_CMVM,
      points: 16
    }
  }

  return (
    < div className='first-placed-row' >
      {/* <div>
        {arrayColleges.slice(0, 8).map((college, index) => (
          <div key={index} className='first-placed-college'>
            <div className='first-placed-college-position'>
              <p>{index + 1}º</p>
            </div>
          </div>
        ))}
      </div>
      <div>
        {arrayColleges.slice(8, 16).map((college, index) => (
          <div key={index} className='first-placed-college'>
            <div className='first-placed-college-position'>
              <p>{index + 9}º</p>
            </div>
          </div>
        ))}
      </div> */}

    </div >
  );
}

export default FisrtPlaced;