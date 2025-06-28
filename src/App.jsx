import React, { useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Home, Zap, DollarSign, MessageSquare, Star, User, Lock, ArrowRight, ChevronRight, Search, Gift, TrendingUp, Sun, Sparkles, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import './App.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

// Mock Data
const performanceData = {
    today: {
        generated: 15.2,
        economy: 12.92,
        percentage_increase: 12,
    },
    month: {
        generated: 280.5,
        economy: 238.43,
    },
    chart: {
        labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
        datasets: [{
            label: 'kWh Gerados',
            data: [12, 19, 15, 17, 22, 18, 20],
            backgroundColor: '#FF6B00',
            borderColor: '#FF8533',
            borderWidth: 1,
            borderRadius: 8,
        }],
    }
};

const economyData = {
    monthly: [
        { month: 'Janeiro', saved: 250.75 },
        { month: 'Fevereiro', saved: 230.50 },
        { month: 'Março', saved: 280.90 },
        { month: 'Abril', saved: 265.10 },
        { month: 'Maio', saved: 295.40 },
        { month: 'Junho', saved: 238.43 },
    ],
    annual: 1561.08,
    projection: 3122.16,
};

const faqs = [
    { q: 'Como minha economia é calculada?', a: 'Sua economia é calculada com base na diferença entre a energia que você consumiu da rede e a energia que sua usina solar gerou e injetou na rede.' },
    { q: 'O que acontece se eu gerar mais energia do que consumo?', a: 'O excedente de energia gera créditos energéticos que podem ser usados para abater o valor da sua conta de luz nos meses seguintes.' },
    { q: 'Como funciona o Clube Solo?', a: 'O Clube Solo oferece descontos exclusivos e cashback em produtos e serviços de parceiros para clientes Solo, como uma recompensa por sua contribuição para um futuro mais sustentável.' },
    { q: 'A manutenção dos painéis está inclusa?', a: 'Oferecemos planos de manutenção que podem ser contratados à parte. A limpeza periódica é recomendada para garantir a máxima eficiência da sua usina.' },
];

const clubOffers = [
    { title: 'Ar Condicionado Inverter', brand: 'LG Dual', discount: '20%', cashback: '5%', image: arCondicionado },
    { title: 'Chuveiro Elétrico', brand: 'Lorenzetti', discount: '15%', cashback: '3%', image: chuveiro },
    { title: 'Geladeira Frost Free', brand: 'Brastemp', discount: '25%', cashback: '8%', image: geladeira },
    { title: 'Lâmpadas LED', brand: 'Philips', discount: '30%', cashback: '10%', image: lampada },
];

import soloLogo from './assets/solo-logo.png';
import soloLogoWhite from './assets/solo-logo-white.png';
import soloSymbol from './assets/solo-symbol.png';
import casaModerna from './assets/casa-moderna.jpg';
import casaSolar from './assets/casa-solar.jpg';
import arCondicionado from './assets/ar-condicionado.jpg';
import chuveiro from './assets/chuveiro.jpg';
import geladeira from './assets/geladeira.jpg';
import lampada from './assets/lampada.jpg';

// Login Screen
const LoginScreen = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        if (email && password) {
            onLogin();
        } else {
            alert('Por favor, preencha todos os campos');
        }
    };

    return (
        <div className="bg-[#121212] min-h-screen flex flex-col items-center justify-center p-4 text-white font-sans">
            <div className="w-full max-w-md">
                <div className="text-center mb-12">
                   <img src={soloLogoWhite} alt="Solo Energia Logo" className="h-16 w-auto mx-auto mb-4" />
                   <p className="text-zinc-400">Você no controle da sua energia</p>
                </div>
                
                <h1 className="text-3xl font-bold text-center mb-2">Bem-vindo de volta!</h1>
                <p className="text-zinc-400 text-center mb-8">Faça login para continuar</p>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                        <input
                            type="email"
                            placeholder="Seu e-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-[#1E1E1E] border border-zinc-700 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-white"
                        />
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                        <input
                            type="password"
                            placeholder="Sua senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-[#1E1E1E] border border-zinc-700 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-white"
                        />
                    </div>
                     <a href="#" className="text-sm text-right block text-zinc-400 hover:text-[#FF6B00]">Esqueceu a senha?</a>
                    <Button
                        type="submit"
                        className="w-full bg-[#FF6B00] hover:bg-orange-600 transition-colors text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2"
                    >
                        Entrar
                        <ArrowRight size={20} />
                    </Button>
                </form>
                <p className="text-center mt-8 text-zinc-400">
                    Não tem uma conta? <a href="#" className="font-semibold text-[#FF6B00] hover:underline">Cadastre-se</a>
                </p>
            </div>
        </div>
    );
};

// Bottom Navigation
const BottomNav = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { id: 'desempenho', icon: Home, label: 'Início' },
        { id: 'economia', icon: DollarSign, label: 'Economia' },
        { id: 'suporte', icon: MessageSquare, label: 'Suporte' },
        { id: 'clube', icon: Star, label: 'Clube' },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-[#1E1E1E] border-t border-zinc-700 px-4 py-2">
            <div className="flex justify-around">
                {tabs.map(({ id, icon: Icon, label }) => (
                    <button
                        key={id}
                        onClick={() => setActiveTab(id)}
                        className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                            activeTab === id ? 'text-[#FF6B00]' : 'text-zinc-400'
                        }`}
                    >
                        <Icon size={24} />
                        <span className="text-xs mt-1">{label}</span>
                    </button>
                ))}
            </div>
        </nav>
    );
};

// Performance Page
const PerformancePage = () => {
    const options = { 
        responsive: true, 
        maintainAspectRatio: false, 
        plugins: { 
            legend: { display: false }, 
            tooltip: { 
                backgroundColor: '#1E1E1E', 
                titleColor: '#FFFFFF', 
                bodyColor: '#FFFFFF', 
                borderColor: '#FF6B00', 
                borderWidth: 1, 
            } 
        }, 
        scales: { 
            x: { 
                grid: { color: 'rgba(255, 255, 255, 0.1)', }, 
                ticks: { color: '#9CA3AF', } 
            }, 
            y: { 
                grid: { color: 'rgba(255, 255, 255, 0.1)', }, 
                ticks: { color: '#9CA3AF', } 
            } 
        }, 
    };

    return (
        <div className="animate-fade-in">
            <header className="mb-6 flex justify-between items-center">
                <div>
                    <p className="text-zinc-400">Bom dia,</p>
                    <h1 className="text-3xl font-bold text-white">Mateus</h1>
                </div>
                <img src={soloSymbol} alt="Solo Energia" className="h-8 w-auto" />
            </header>

            <div className="bg-[#1E1E1E] rounded-2xl p-6 mb-6 shadow-lg">
                <div className="flex justify-between items-start">
                    <div>
                         <p className="text-zinc-400 text-sm flex items-center gap-2"><Sun size={16} className="text-[#FFC700]"/>Sua energia hoje</p>
                         <h2 className="text-4xl font-bold text-white mt-2">{performanceData.today.generated} <span className="text-2xl text-zinc-400">kWh</span></h2>
                    </div>
                    <span className="text-green-400 font-semibold bg-green-500/10 px-2 py-1 rounded-full text-sm">
                        +{performanceData.today.percentage_increase}%
                    </span>
                </div>
                <div className="mt-4 flex justify-between text-zinc-300">
                    <span>Economia hoje: <span className="font-bold text-white">R$ {performanceData.today.economy.toFixed(2)}</span></span>
                     <span>Mês: <span className="font-bold text-white">{performanceData.month.generated} kWh</span></span>
                </div>
                 <button className="text-[#FF6B00] font-semibold mt-6 flex items-center gap-2">
                    Ver mais detalhes <ChevronRight size={18} />
                </button>
            </div>
            
            <div className="bg-[#1E1E1E] rounded-2xl p-6 mb-6 shadow-lg">
                <h3 className="font-bold text-xl mb-4">Geração na Semana</h3>
                <div className="h-64">
                   <Bar options={options} data={performanceData.chart} />
                </div>
            </div>

            <div className="bg-[#1E1E1E] rounded-2xl p-6 shadow-lg">
                 <h3 className="font-bold text-xl mb-2 flex items-center gap-2"><Gift size={22} className="text-[#FF6B00]"/>Relatórios de uso</h3>
                 <p className="text-zinc-400 text-sm mb-4">Ar-condicionado consumindo 26%, status acima do normal.</p>
                 <button className="text-[#FF6B00] font-semibold flex items-center gap-2">
                    Assinar relatórios premium <ChevronRight size={18} />
                </button>
            </div>
        </div>
    );
};

// Economy Page
const EconomyPage = () => {
    const [analysis, setAnalysis] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerateAnalysis = async () => {
        setIsLoading(true);
        setAnalysis('');
        
        // Simulação de análise para demo
        setTimeout(() => {
            setAnalysis(`
                <h3>📊 Análise da Sua Economia</h3>
                <p><strong>Tendência Positiva:</strong> Sua economia mensal tem mostrado crescimento consistente, com destaque para maio (R$ 295,40).</p>
                <p><strong>Economia Anual:</strong> Você já economizou R$ 1.561,08 este ano, superando a meta inicial!</p>
                <h4>💡 Dicas Personalizadas:</h4>
                <p>1. <strong>Otimize o horário de uso:</strong> Use aparelhos de alto consumo entre 10h-16h quando a geração solar é máxima.</p>
                <p>2. <strong>Monitore o ar-condicionado:</strong> Representa 26% do seu consumo. Considere ajustar a temperatura em 1°C.</p>
                <p>3. <strong>Aproveite os créditos:</strong> Você tem créditos acumulados que podem ser usados nos próximos meses.</p>
            `);
            setIsLoading(false);
        }, 2000);
    };
    
    const lineOptions = { 
        responsive: true, 
        maintainAspectRatio: false, 
        plugins: { 
            legend: { display: false, }, 
        }, 
        scales: { 
            x: { 
                grid: { color: 'rgba(255, 255, 255, 0.1)' }, 
                ticks: { color: '#9CA3AF' } 
            }, 
            y: { 
                grid: { color: 'rgba(255, 255, 255, 0.1)' }, 
                ticks: { 
                    color: '#9CA3AF', 
                    callback: (value) => `R$ ${value}` 
                } 
            } 
        }, 
        elements: { 
            line: { 
                tension: 0.4, 
                borderColor: '#FF6B00', 
                backgroundColor: 'rgba(255, 107, 0, 0.2)', 
                fill: true, 
            }, 
            point: { 
                backgroundColor: '#FF6B00', 
                borderColor: '#FFFFFF', 
                borderWidth: 2, 
                radius: 5 
            } 
        } 
    };
    
    const lineData = { 
        labels: economyData.monthly.map(d => d.month.substring(0, 3)), 
        datasets: [{ 
            label: 'Economia Mensal', 
            data: economyData.monthly.map(d => d.saved), 
        }] 
    };

    return (
        <div className="animate-fade-in">
            <header className="mb-6 flex justify-between items-center">
                <h1 className="text-3xl font-bold">Sua Economia</h1>
                <img src={soloSymbol} alt="Solo Energia" className="h-8 w-auto" />
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-[#1E1E1E] p-6 rounded-2xl">
                    <p className="text-zinc-400">Economia Anual</p>
                    <p className="text-3xl font-bold text-green-400">R$ {economyData.annual.toFixed(2)}</p>
                </div>
                <div className="bg-[#1E1E1E] p-6 rounded-2xl">
                    <p className="text-zinc-400">Projeção Próximo Ano</p>
                    <p className="text-3xl font-bold text-white">R$ {economyData.projection.toFixed(2)}</p>
                </div>
            </div>

            <div className="bg-[#1E1E1E] rounded-2xl p-6 mb-6">
                <h3 className="font-bold text-xl mb-4">Análise Inteligente</h3>
                <Button 
                    onClick={handleGenerateAnalysis}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-[#FF6B00] to-orange-400 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed">
                    <Sparkles size={20}/> {isLoading ? 'Analisando...' : '✨ Gerar Análise de Economia'}
                </Button>
                {isLoading && <div className="flex justify-center items-center mt-4"><LoaderCircle className="animate-spin text-[#FF6B00]" size={32} /></div>}
                {analysis && <div className="mt-4 p-4 bg-zinc-800/50 rounded-lg prose prose-invert prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: analysis }} />}
            </div>
            
            <div className="bg-[#1E1E1E] rounded-2xl p-6 mb-6">
                <h3 className="font-bold text-xl mb-4">Histórico Mensal</h3>
                <div className="h-64">
                    <Line options={lineOptions} data={lineData} />
                </div>
            </div>

             <div className="bg-[#1E1E1E] rounded-2xl p-6">
                <h3 className="font-bold text-xl mb-4">Detalhes da Economia</h3>
                <ul className="space-y-3">
                    {economyData.monthly.slice().reverse().map(item => (
                        <li key={item.month} className="flex justify-between items-center p-3 bg-zinc-800/50 rounded-lg">
                            <span className="text-zinc-300">{item.month}</span>
                            <span className="font-bold text-green-400">R$ {item.saved.toFixed(2)}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

// Support Page
const SupportPage = () => {
    const [openFaq, setOpenFaq] = useState(null);

    return (
        <div className="animate-fade-in">
            <header className="mb-6 flex justify-between items-center">
                <h1 className="text-3xl font-bold">Suporte</h1>
                <img src={soloSymbol} alt="Solo Energia" className="h-8 w-auto" />
            </header>
            
            <div className="bg-[#1E1E1E] rounded-2xl p-6 mb-6">
                <h3 className="font-bold text-xl mb-4">Como podemos ajudar?</h3>
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar ajuda..."
                        className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-white"
                    />
                </div>
            </div>

            <div className="bg-[#1E1E1E] rounded-2xl p-6 mb-6">
                <h3 className="font-bold text-xl mb-4">Perguntas Frequentes</h3>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border-b border-zinc-700 last:border-b-0">
                            <button
                                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                className="w-full text-left py-4 flex justify-between items-center"
                            >
                                <span className="font-medium">{faq.q}</span>
                                <ChevronRight 
                                    className={`transform transition-transform ${openFaq === index ? 'rotate-90' : ''}`} 
                                    size={20} 
                                />
                            </button>
                            {openFaq === index && (
                                <div className="pb-4 text-zinc-400">
                                    {faq.a}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-[#1E1E1E] rounded-2xl p-6">
                <h3 className="font-bold text-xl mb-4">Contato Direto</h3>
                <div className="space-y-4">
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl">
                        💬 Chat ao Vivo
                    </Button>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl">
                        📞 Ligar para Suporte
                    </Button>
                    <Button className="w-full bg-zinc-700 hover:bg-zinc-600 text-white py-3 rounded-xl">
                        📧 Enviar E-mail
                    </Button>
                </div>
            </div>
        </div>
    );
};

// Club Page
const ClubPage = () => {
    return (
        <div className="animate-fade-in">
            <header className="mb-6 flex justify-between items-center">
                <h1 className="text-3xl font-bold">Clube Solo</h1>
                <img src={soloSymbol} alt="Solo Energia" className="h-8 w-auto" />
            </header>
            
            <div className="bg-gradient-to-r from-[#FF6B00] to-orange-400 rounded-2xl p-6 mb-6 text-white">
                <h3 className="font-bold text-xl mb-2">🌟 Bem-vindo ao Clube!</h3>
                <p className="text-orange-100 mb-4">Descontos exclusivos e cashback para clientes Solo</p>
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-sm text-orange-100">Seu cashback acumulado</p>
                        <p className="text-2xl font-bold">R$ 127,50</p>
                    </div>
                    <Button className="bg-white text-[#FF6B00] hover:bg-orange-50 font-bold px-6 py-2 rounded-xl">
                        Resgatar
                    </Button>
                </div>
            </div>

            <div className="bg-[#1E1E1E] rounded-2xl p-6 mb-6">
                <h3 className="font-bold text-xl mb-4">Ofertas Exclusivas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {clubOffers.map((offer, index) => (
                        <div key={index} className="bg-zinc-800/50 rounded-xl p-4">
                            <img 
                                src={offer.image} 
                                alt={offer.title}
                                className="w-full h-32 object-cover rounded-lg mb-3"
                            />
                            <h4 className="font-bold text-white mb-1">{offer.title}</h4>
                            <p className="text-zinc-400 text-sm mb-2">{offer.brand}</p>
                            <div className="flex justify-between items-center">
                                <div className="flex gap-2">
                                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                                        {offer.discount} OFF
                                    </span>
                                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                                        {offer.cashback} Cashback
                                    </span>
                                </div>
                                <Button className="bg-[#FF6B00] hover:bg-orange-600 text-white text-xs px-3 py-1 rounded">
                                    Ver Oferta
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-[#1E1E1E] rounded-2xl p-6">
                <h3 className="font-bold text-xl mb-4">Benefícios do Clube</h3>
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#FF6B00] rounded-full flex items-center justify-center">
                            <span className="text-white text-sm">💰</span>
                        </div>
                        <div>
                            <p className="font-medium">Cashback em todas as compras</p>
                            <p className="text-zinc-400 text-sm">Ganhe dinheiro de volta em produtos parceiros</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#FF6B00] rounded-full flex items-center justify-center">
                            <span className="text-white text-sm">🏷️</span>
                        </div>
                        <div>
                            <p className="font-medium">Descontos exclusivos</p>
                            <p className="text-zinc-400 text-sm">Preços especiais só para clientes Solo</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#FF6B00] rounded-full flex items-center justify-center">
                            <span className="text-white text-sm">⚡</span>
                        </div>
                        <div>
                            <p className="font-medium">Produtos sustentáveis</p>
                            <p className="text-zinc-400 text-sm">Foco em eficiência energética</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [activeTab, setActiveTab] = useState('desempenho');

    if (!isLoggedIn) {
        return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
    }

    const renderContent = () => {
        switch (activeTab) {
            case 'desempenho':
                return <PerformancePage />;
            case 'economia':
                return <EconomyPage />;
            case 'suporte':
                return <SupportPage />;
            case 'clube':
                return <ClubPage />;
            default:
                return <PerformancePage />;
        }
    };

    return (
        <div className="bg-[#121212] min-h-screen font-sans text-white flex flex-col">
            <main className="flex-grow p-4 md:p-6 pb-24">
                {renderContent()}
            </main>
            <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
    );
};

export default App;

