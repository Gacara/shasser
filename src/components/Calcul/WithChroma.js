import React from 'react';

function WithChroma({ compteur }) {
  return (
    <div>
      {(() => {
        switch (true) {
          case compteur <= 19 && compteur >= 0:
            return <p>1/1365</p>;
          case compteur <= 49 && compteur >= 20:
            return <p>1/1024</p>;
          case compteur < 100 && compteur >= 50:
            return <p>1/819</p>;
          case compteur < 200 && compteur >= 100:
            return <p>1/682</p>;
          case compteur < 500 && compteur >= 200:
            return <p>1/585</p>;
          default:
            return <p>1/512</p>;
        }
      })()}
    </div>
  );
}
export default WithChroma;
