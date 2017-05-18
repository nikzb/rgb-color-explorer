class TimedFunctionCallSequence {
  // The getCurrentTourStep property should be a function that returns the current tour step
  //
  // The sequence property of the parameter object should be an array of objects with
  // the following properties:
  //   * callback - function to callback
  //   * waitTime - the time to wait from the previous function call
  //   * tourStepItBelongsTo - the Shepherd Tour step # this belongs to (an integer)
  constructor({getCurrentTourStep, sequence=[]}) {
    this.getCurrentTourStep = getCurrentTourStep;
    this.sequence = sequence;
  }

  addFunctionCall(functionCallObject) {
    this.sequence.push(functionCallObject);
  }

  initiateSequence() {
    const executeSequence = (sequenceIndex) => {
      if (sequenceIndex < this.sequence.length) {
        const functionCallObject = this.sequence[sequenceIndex];
        console.log(`current step: ${this.getCurrentTourStep()}`);
        console.log(`tour step it belongs to ${functionCallObject.tourStepItBelongsTo}`);
        if (this.getCurrentTourStep() === functionCallObject.tourStepItBelongsTo) {
          setTimeout(() => {
            // cancel the sequence is no longer on the matching tour step
            if (this.getCurrentTourStep() !== functionCallObject.tourStepItBelongsTo) {
              return;
            }
            
            console.log(`callback: ${functionCallObject.callback}`);

            functionCallObject.callback();
            executeSequence(sequenceIndex + 1);
          }, functionCallObject.waitTime);
        }
      }
    }

    console.log('in TFCS ', this.sequence);
    executeSequence(0);
  }
}

export default TimedFunctionCallSequence;
