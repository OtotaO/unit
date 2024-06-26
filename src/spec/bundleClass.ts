import { Unit } from '../Class/Unit'
import { System } from '../system'
import { UnitBundle } from '../types/UnitBundle'
import { UnitBundleSpec } from '../types/UnitBundleSpec'
import { UnitClass } from '../types/UnitClass'
import { parseMemorySpec } from './evaluate/parseMemorySpec'

export function bundleClass<T extends Unit = any>(
  Class: UnitClass<T>,
  bundle: UnitBundleSpec
): UnitBundle<T> {
  const {
    unit: { id, memory },
  } = bundle

  // @ts-ignore
  class Bundle extends Class {
    static __bundle = bundle

    constructor(system: System) {
      bundle.specs && system.injectSpecs(bundle.specs)

      super(system, id)

      if (memory) {
        const _memory = parseMemorySpec(memory, system.specs, system.classes)

        this.restore(_memory)
      }
    }
  }

  // @ts-ignore
  return Bundle
}
