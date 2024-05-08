import TripleBeam from 'triple-beam';
import Transport from "winston-transport";

class SimpleConsoleTransport extends Transport {
  constructor(opts?: Transport.TransportStreamOptions) {
    super(opts);
  }

  log = (info: any, callback: () => void) => {
    setImmediate(() => this.emit("logged", info));

    console.log(info[TripleBeam.MESSAGE]);

    if (callback) {
      callback();
    }
  };
}

export {
  SimpleConsoleTransport,
}