import * as assert from 'assert'
import { Graph } from '../../../Class/Graph'
import { watchGraphAndLog, watchUnitAndLog } from '../../../debug'
import { fromSpec } from '../../../spec/fromSpec'
import _specs from '../../../system/_specs'
// import NArrayBuilder from '../../../system/core/common/NArrayBuilder/Class'
import { system } from '../../util/system'

const spec = require('../../../system/core/common/NArrayBuilder/spec.json')
const NArrayBuilder = fromSpec(spec, _specs)

const nArrayBuilder = new NArrayBuilder(system)

false && watchGraphAndLog(nArrayBuilder)
false && watchUnitAndLog(nArrayBuilder)
false && watchGraphAndLog(nArrayBuilder.getUnit('buildarrayfrom') as Graph)

nArrayBuilder.play()

nArrayBuilder.push('n', 0)
assert.deepEqual(nArrayBuilder.take('a[]'), [])
assert.equal(nArrayBuilder.take('a[]'), undefined)
assert.equal(nArrayBuilder.peakInput('n'), undefined)

nArrayBuilder.push('n', 1)
assert.equal(nArrayBuilder.peakInput('n'), 1)
assert.equal(nArrayBuilder.take('a[]'), undefined)
nArrayBuilder.push('a', 0)
assert.deepEqual(nArrayBuilder.take('a[]'), [0])
assert.deepEqual(nArrayBuilder.take('a[]'), undefined)

nArrayBuilder.push('a', 0)
nArrayBuilder.push('n', 2)
nArrayBuilder.push('a', 1)
assert.deepEqual(nArrayBuilder.take('a[]'), [0, 1])
assert.equal(nArrayBuilder.takeInput('a'), undefined)
assert.equal(nArrayBuilder.takeInput('n'), undefined)

nArrayBuilder.push('n', 3)
nArrayBuilder.push('a', 10)
nArrayBuilder.push('a', 11)
nArrayBuilder.push('a', 12)
assert.deepEqual(nArrayBuilder.take('a[]'), [10, 11, 12])
assert.deepEqual(nArrayBuilder.take('a[]'), undefined)
assert.equal(nArrayBuilder.takeInput('n'), undefined)
assert.equal(nArrayBuilder.takeInput('a'), undefined)

nArrayBuilder.push('n', 3)
nArrayBuilder.push('a', 13)
nArrayBuilder.push('a', 14)
nArrayBuilder.push('a', 15)
nArrayBuilder.push('n', 2)
nArrayBuilder.push('a', 16)
nArrayBuilder.push('a', 17)
assert.deepEqual(nArrayBuilder.take('a[]'), [16, 17])
assert.deepEqual(nArrayBuilder.take('a[]'), undefined)
assert.equal(nArrayBuilder.takeInput('n'), undefined)
assert.equal(nArrayBuilder.takeInput('a'), undefined)
nArrayBuilder.push('n', 1)
nArrayBuilder.push('a', 18)
assert.deepEqual(nArrayBuilder.take('a[]'), [18])
assert.deepEqual(nArrayBuilder.take('a[]'), undefined)
nArrayBuilder.push('n', 1)
nArrayBuilder.push('a', 19)
nArrayBuilder.push('n', 0)
assert.deepEqual(nArrayBuilder.take('a[]'), [])
assert.deepEqual(nArrayBuilder.take('a[]'), undefined)

nArrayBuilder.push('n', 3)
nArrayBuilder.push('a', 20)
nArrayBuilder.push('a', 21)
nArrayBuilder.push('a', 22)
nArrayBuilder.push('a', 23)
assert.deepEqual(nArrayBuilder.take('a[]'), [20, 21, 22])
nArrayBuilder.push('n', 1)
assert.deepEqual(nArrayBuilder.take('a[]'), [23])
assert.deepEqual(nArrayBuilder.take('a[]'), undefined)

nArrayBuilder.push('n', 1)
assert.deepEqual(nArrayBuilder.takeInput('n'), 1)
assert.deepEqual(nArrayBuilder.peakInput('n'), undefined)
nArrayBuilder.push('a', 1)
assert.deepEqual(nArrayBuilder.peakInput('a'), 1)
assert.deepEqual(nArrayBuilder.peak('a[]'), undefined)
nArrayBuilder.push('n', 1)
assert.deepEqual(nArrayBuilder.take('a[]'), [1])
assert.deepEqual(nArrayBuilder.peakInput('a'), undefined)
assert.deepEqual(nArrayBuilder.peakInput('n'), undefined)

nArrayBuilder.setInputConstant('a', true)
nArrayBuilder.push('a', 0)
nArrayBuilder.push('n', 2)
assert.deepEqual(nArrayBuilder.peakOutput('a[]'), [0, 0])
nArrayBuilder.push('n', 1)
assert.deepEqual(nArrayBuilder.takeOutput('a[]'), [0])
nArrayBuilder.setInputConstant('a', false)
assert.deepEqual(nArrayBuilder.takeInput('a'), 0)
assert.deepEqual(nArrayBuilder.peakInput('a'), undefined)
assert.deepEqual(nArrayBuilder.takeInput('n'), undefined)

nArrayBuilder.setInputConstant('a', true)
nArrayBuilder.push('a', 0)
nArrayBuilder.push('n', 6)
assert.deepEqual(nArrayBuilder.take('a[]'), [0, 0, 0, 0, 0, 0])
assert.deepEqual(nArrayBuilder.take('a[]'), undefined)
nArrayBuilder.push('n', 3)
assert.deepEqual(nArrayBuilder.take('a[]'), [0, 0, 0])
assert.deepEqual(nArrayBuilder.take('a[]'), undefined)
nArrayBuilder.push('n', 3)
assert.deepEqual(nArrayBuilder.take('a[]'), [0, 0, 0])
nArrayBuilder.push('n', 4)
assert.deepEqual(nArrayBuilder.take('a[]'), [0, 0, 0, 0])
nArrayBuilder.push('n', 2)
assert.deepEqual(nArrayBuilder.peakOutput('a[]'), [0, 0])
nArrayBuilder.push('n', 2)
assert.deepEqual(nArrayBuilder.peakOutput('a[]'), [0, 0])
nArrayBuilder.push('n', 1)
assert.deepEqual(nArrayBuilder.peakOutput('a[]'), [0])
nArrayBuilder.push('n', 3)
assert.deepEqual(nArrayBuilder.takeOutput('a[]'), [0, 0, 0])
nArrayBuilder.setInputConstant('a', false)
assert.deepEqual(nArrayBuilder.takeInput('a'), 0)
assert.deepEqual(nArrayBuilder.peakInput('a'), undefined)
assert.deepEqual(nArrayBuilder.takeInput('n'), undefined)

nArrayBuilder.setInputConstant('a', true)
nArrayBuilder.setInputConstant('n', true)
nArrayBuilder.push('n', 0)
assert.equal(nArrayBuilder.peakInput('n'), 0)
assert.deepEqual(nArrayBuilder.take('a[]'), [])
assert.deepEqual(nArrayBuilder.take('a[]'), [])
assert.deepEqual(nArrayBuilder.take('a[]'), [])
assert.deepEqual(nArrayBuilder.take('a[]'), [])
assert.deepEqual(nArrayBuilder.take('a[]'), [])
assert.deepEqual(nArrayBuilder.take('a[]'), [])
nArrayBuilder.setInputConstant('a', false)
nArrayBuilder.setInputConstant('n', false)
assert.deepEqual(nArrayBuilder.takeInput('n'), 0)
assert.deepEqual(nArrayBuilder.takeInput('n'), undefined)

nArrayBuilder.setInputConstant('a', true)
nArrayBuilder.setInputConstant('n', true)
nArrayBuilder.push('a', 1)
nArrayBuilder.push('n', 1)
assert.equal(nArrayBuilder.peakInput('n'), 1)
assert.equal(nArrayBuilder.peakInput('a'), 1)
assert.deepEqual(nArrayBuilder.take('a[]'), [1])
assert.deepEqual(nArrayBuilder.take('a[]'), [1])
assert.deepEqual(nArrayBuilder.take('a[]'), [1])
assert.deepEqual(nArrayBuilder.take('a[]'), [1])
assert.deepEqual(nArrayBuilder.take('a[]'), [1])
assert.deepEqual(nArrayBuilder.take('a[]'), [1])
nArrayBuilder.setInputConstant('a', false)
nArrayBuilder.setInputConstant('n', false)
assert.deepEqual(nArrayBuilder.take('a[]'), [1])

nArrayBuilder.setInputConstant('a', true)
nArrayBuilder.setInputConstant('n', true)
nArrayBuilder.push('a', 2)
nArrayBuilder.push('n', 2)
assert.deepEqual(nArrayBuilder.take('a[]'), [2, 2])
assert.deepEqual(nArrayBuilder.take('a[]'), [2, 2])
assert.deepEqual(nArrayBuilder.take('a[]'), [2, 2])
assert.deepEqual(nArrayBuilder.take('a[]'), [2, 2])
assert.deepEqual(nArrayBuilder.take('a[]'), [2, 2])
assert.deepEqual(nArrayBuilder.take('a[]'), [2, 2])
assert.deepEqual(nArrayBuilder.take('a[]'), [2, 2])
nArrayBuilder.setInputConstant('a', false)
nArrayBuilder.setInputConstant('n', false)
assert.deepEqual(nArrayBuilder.take('a[]'), [2, 2])

nArrayBuilder.setInputConstant('a', true)
nArrayBuilder.setInputConstant('n', true)
nArrayBuilder.push('a', 1)
nArrayBuilder.push('n', 3)
assert.deepEqual(nArrayBuilder.take('a[]'), [1, 1, 1])
assert.deepEqual(nArrayBuilder.take('a[]'), [1, 1, 1])
assert.deepEqual(nArrayBuilder.take('a[]'), [1, 1, 1])
assert.deepEqual(nArrayBuilder.take('a[]'), [1, 1, 1])
assert.deepEqual(nArrayBuilder.take('a[]'), [1, 1, 1])
assert.deepEqual(nArrayBuilder.take('a[]'), [1, 1, 1])
assert.deepEqual(nArrayBuilder.take('a[]'), [1, 1, 1])
assert.deepEqual(nArrayBuilder.take('a[]'), [1, 1, 1])
assert.deepEqual(nArrayBuilder.take('a[]'), [1, 1, 1])
assert.deepEqual(nArrayBuilder.take('a[]'), [1, 1, 1])
assert.deepEqual(nArrayBuilder.take('a[]'), [1, 1, 1])
assert.deepEqual(nArrayBuilder.take('a[]'), [1, 1, 1])
assert.deepEqual(nArrayBuilder.take('a[]'), [1, 1, 1])
assert.deepEqual(nArrayBuilder.take('a[]'), [1, 1, 1])
assert.deepEqual(nArrayBuilder.take('a[]'), [1, 1, 1])
// arrayBuilder.reset()
// assert.deepEqual(arrayBuilder.take('a[]'), [1, 1, 1])
