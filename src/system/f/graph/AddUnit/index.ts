import { Functional } from '../../../../Class/Functional'
import { Done } from '../../../../Class/Functional/Done'
import { applyUnitDefaultIgnored } from '../../../../spec/fromSpec'
import { System } from '../../../../system'
import { G } from '../../../../types/interface/G'
import { UnitBundle } from '../../../../types/UnitBundle'
import { clone } from '../../../../util/object'
import { weakMerge } from '../../../../weakMerge'
import { ID_ADD_UNIT } from '../../../_ids'

export interface I<T> {
  id: string
  class: UnitBundle<any>
  graph: G
}

export interface O<T> {}

export default class AddUnit<T> extends Functional<I<T>, O<T>> {
  constructor(system: System) {
    super(
      {
        i: ['id', 'class', 'graph'],
        o: [],
      },
      {
        input: {
          graph: {
            ref: true,
          },
        },
      },
      system,
      ID_ADD_UNIT
    )
  }

  f({ id, class: Class, graph }: I<T>, done: Done<O<T>>): void {
    try {
      const { __bundle } = Class
      const { id: __id, input: __inputs = {} } = __bundle.unit

      const specs = weakMerge(__bundle.specs, this.__system.specs)

      const bundle = clone(__bundle)

      applyUnitDefaultIgnored(bundle.unit, specs)

      graph.addUnitSpec(id, bundle)
    } catch (err) {
      done(undefined, err.message)

      return
    }

    done()
  }
}
