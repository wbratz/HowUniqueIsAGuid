import Header from './components/Header'
import Hero from './components/Hero'
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

export default function App() {
  return (
    <div className="relative min-h-screen bg-grid bg-[length:24px_24px]">
      <ParallaxStars />
      <Header />
      <main>
        <Hero />
        <StatGrid />
        <DeepComparisons />
        <RelatableScenarios />
        <ProbabilityCalculator />
        <LayersExplainer />
        <WitnessCalculator />
        <Generator />
        <CodeSamples />
        <Summary />
        <Sources />
      </main>
    </div>
  )
}
