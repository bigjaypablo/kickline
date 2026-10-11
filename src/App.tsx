import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { INFO } from './content'
import { SPORT_IDS } from './config'
import Layout from './components/Layout'
import Home from './pages/Home'
import { MarketRoute } from './pages/Predictions'
import Botd from './pages/Botd'
import Articles from './pages/Articles'
import Article from './pages/Article'
import Leagues from './pages/Leagues'
import InfoPage from './pages/Info'
import NotFound from './pages/NotFound'

function SportHome() {
  const { sport } = useParams()
  const id = SPORT_IDS.find((s) => s === sport)
  return id ? <Home sport={id} /> : <NotFound />
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="football" element={<Navigate to="/" replace />} />
            <Route path="football/:market" element={<MarketRoute />} />
            <Route path="botd" element={<Botd />} />
            <Route path="articles" element={<Articles />} />
            <Route path="articles/:slug" element={<Article />} />
            <Route path="leagues" element={<Leagues />} />
            {Object.keys(INFO).map((k) => (
              <Route key={k} path={k} element={<InfoPage page={k} />} />
            ))}
            <Route path=":sport" element={<SportHome />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MotionConfig>
  )
}
