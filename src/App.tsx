import Header from './components/Header'
import HeroTop from './components/HeroTop'
import HeroDetails from './components/HeroDetails'
import WhatIsGuid from './components/WhatIsGuid'
import RealWorldExamples from './components/RealWorldExamples'
import StatGrid from './components/StatGrid'
import ProbabilityCalculator from './components/ProbabilityCalculator'
import DeepComparisons from './components/DeepComparisons'
import ParallaxStars from './components/ParallaxStars'
import RelatableScenarios from './components/RelatableScenarios'
import LayersExplainer from './components/LayersExplainer'
import WitnessCalculator from './components/WitnessCalculator'
import Sources from './components/Sources'
import Summary from './components/Summary'
import Generator from './components/Generator'
import CodeSamples from './components/CodeSamples'
import ScrollProgress from './components/ScrollProgress'
import TimeOnPage from './components/TimeOnPage'
import PersonalizedLifetime from './components/PersonalizedLifetime'

export default function App() {
  return (
    <div className="relative min-h-screen bg-grid bg-[length:24px_24px]">
      <ScrollProgress />
      <ParallaxStars />
      <Header />
      <main>
        <HeroTop />
        <WhatIsGuid />
        <TimeOnPage />
        <HeroDetails />
        <RealWorldExamples />
        <StatGrid />
        <DeepComparisons />
        <RelatableScenarios />
        <ProbabilityCalculator />
        <LayersExplainer />
        <WitnessCalculator />
        <PersonalizedLifetime />
        <Generator />
        <CodeSamples />
        <Summary />
        <Sources />
      </main>
    </div>
  )
}
