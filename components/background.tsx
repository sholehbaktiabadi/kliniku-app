import { LinearGradient } from "expo-linear-gradient";

export const GradientBackground: React.FC<any> = ({ children }) => {
  return (
    <LinearGradient
      colors={['#2b7fff', '#63a2ffff', '#f8f8f8ff', '#ffffffff']}
      locations={[0.05, 0.20, 0.4, 1]}
      style={{ minHeight: '100%' }}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      {children}
    </LinearGradient>

  );
}

export const AuthBackground: React.FC<any> = ({ children }) => {
  return (
    <LinearGradient
      colors={['#2b7fff', '#63a2ffff', '#aaccffff', '#c4dcffff']}
      locations={[0.1, 0.39, 0.47, 1]}
      className="absolute top-0 left-0 right-0 bottom-0"
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      {children}
    </LinearGradient>

  );
}


// export const ModernBlueOcean: React.FC<any> = ({ children }) => {
//   return (
//     <LinearGradient
//       colors={['#667eea', '#764ba2', '#f093fb', '#f5576c']}
//       locations={[0.1, 0.4, 0.7, 1]}
//       className="absolute top-0 left-0 right-0 bottom-0"
//       start={{ x: 0, y: 0 }}
//       end={{ x: 1, y: 1 }}
//     >
//       {children}
//     </LinearGradient>
//   );
// }

// export const SunsetGlow: React.FC<any> = ({ children }) => {
//   return (
//     <LinearGradient
//       colors={['#ff6b6b', '#ffa726', '#ffeaa7', '#a29bfe']}
//       locations={[0.1, 0.4, 0.7, 1]}
//       className="absolute top-0 left-0 right-0 bottom-0"
//       start={{ x: 0, y: 0 }}
//       end={{ x: 1, y: 1 }}
//     >
//       {children}
//     </LinearGradient>
//   );
// }

// export const DeepSpace: React.FC<any> = ({ children }) => {
//   return (
//     <LinearGradient
//       colors={['#0c2461', '#1e3799', '#4a69bd', '#6a89cc']}
//       locations={[0.1, 0.4, 0.7, 1]}
//       className="absolute top-0 left-0 right-0 bottom-0"
//       start={{ x: 0, y: 0 }}
//       end={{ x: 1, y: 1 }}
//     >
//       {children}
//     </LinearGradient>
//   );
// }


// export const TropicalParadise: React.FC<any> = ({ children }) => {
//   return (
//     <LinearGradient
//       colors={['#43e97b', '#38f9d7', '#fa709a', '#fee140']}
//       locations={[0.1, 0.4, 0.7, 1]}
//       className="absolute top-0 left-0 right-0 bottom-0"
//       start={{ x: 0, y: 0 }}
//       end={{ x: 1, y: 1 }}
//     >
//       {children}
//     </LinearGradient>
//   );
// }


// export const RoyalPurple: React.FC<any> = ({ children }) => {
//   return (
//     <LinearGradient
//       colors={['#9d50bb', '#6e48aa', '#4776E6', '#8E54E9']}
//       locations={[0.1, 0.4, 0.7, 1]}
//       className="absolute top-0 left-0 right-0 bottom-0"
//       start={{ x: 0, y: 0 }}
//       end={{ x: 1, y: 1 }}
//     >
//       {children}
//     </LinearGradient>
//   );
// }