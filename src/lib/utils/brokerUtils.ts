import { Zap, Network } from 'lucide-react'

export type BrokerType = 'iotnet' | 'external'

/**
 * Utility functions untuk broker-related logic
 * Centralized logic untuk mendapatkan icon, label, dan variant berdasarkan broker type
 */

export const getBrokerIcon = (brokerType: BrokerType) => {
  switch (brokerType) {
    case 'iotnet':
      return Zap
    case 'external':
      return Network
    default:
      return Network
  }
}

export const getBrokerLabel = (brokerType: BrokerType): string => {
  switch (brokerType) {
    case 'iotnet':
      return 'IoTNet Broker'
    case 'external':
      return 'External Broker'
    default:
      return 'Unknown Broker'
  }
}

export const getBrokerBadgeVariant = (
  brokerType: BrokerType
): 'default' | 'outline' => {
  switch (brokerType) {
    case 'iotnet':
      return 'default'
    case 'external':
      return 'outline'
    default:
      return 'outline'
  }
}

export const getBrokerDescription = (brokerType: BrokerType): string => {
  switch (brokerType) {
    case 'iotnet':
      return 'Connect to the default IoTNet broker with automatic configuration.'
    case 'external':
      return 'Connect to your existing MQTT broker.'
    default:
      return 'Unknown broker type.'
  }
}

export const getBrokerTitle = (brokerType: BrokerType): string => {
  switch (brokerType) {
    case 'iotnet':
      return 'Use IoTNet Broker'
    case 'external':
      return 'Use Your Broker'
    default:
      return 'Unknown Broker'
  }
}
