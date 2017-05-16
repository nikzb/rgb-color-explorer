import TimedFunctionCallSequence from './TimedFunctionCallSequence';

describe('TimedFunctionCallSequence', () => {

  const getCallbackFunction = (number) => {
    return () => { console.log(`step #: ${number}`); };
  }

  const getCurrentTourStep = () => { return 1 };

  const sequence = [
    {
      callback: getCallbackFunction(1),
      waitTime: 1000,
      tourStepItBelongsTo: 1
    },
    {
      callback: getCallbackFunction(2),
      waitTime: 500,
      tourStepItBelongsTo: 1
    },
    {
      callback: getCallbackFunction(3),
      waitTime: 200,
      tourStepItBelongsTo: 1
    }
  ];

  const funcSequence = new TimedFunctionCallSequence({
    sequence,
    getCurrentTourStep
  });

  it('should print stuff', () => {
    funcSequence.initiateSequence();
  });

});
