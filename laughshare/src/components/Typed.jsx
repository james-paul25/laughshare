import React from 'react';
import Typewriter from  'typewriter-effect';

const Typed = (string) => {
  return (
    <div>
      <Typewriter
        options={{
          strings: [string],
          autoStart: true,
          loop: true,
          delay: 70,
          deleteSpeed:20,
        }}
      />
    </div>
  )
}

export default Typed
