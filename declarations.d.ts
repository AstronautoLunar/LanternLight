declare module "react-native-flashlight" {
  export function switchOn(): Promise<void>;
  export function switchOff(): Promise<void>;
  export function isSwitchedOn(): Promise<boolean>;
};

declare module "expo-camera" {
  export function Camera({ 
    flashMode: any, 
    style: any, 
  }: ListProps): any;
};