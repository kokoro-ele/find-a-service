function constructStepData(status) {
  status = parseInt(status)
  const pending = {
    title: 'Pending',
    description: "Waiting service provider's response... ",
  }
  const reject = {
    title: 'Rejected',
    description: 'Rejected by service provider. ',
  }
  const accept = {
    title: 'Accepted',
    description: 'Accepted by service provider. ',
  }
  const detail = {
    title: ' Further details required',
    description: 'Please provide more information. ',
  }
  const complete = {
    title: ' Completed',
    description: 'The service is done. ',
  }

  if (status === 0) return [[pending, accept, complete], 0]
  if (status === 1) return [[pending, reject, complete], 2]
  if (status === 2) return [[pending, accept, complete], 1]
  if (status === 3) return [[pending, detail, accept, complete], 1]
}

export default constructStepData
