/**
 * Virtual Pins Data Transformer
 * Extracts and transforms virtual pins from API response for use in components
 */

import { virtualPinsResponse } from './virtualPinsResponse'

// Extract virtual pin values for direct use in components
export const VIRTUAL_PINS = virtualPinsResponse.data.virtualPins.map(
  (pin) => pin.value
)
