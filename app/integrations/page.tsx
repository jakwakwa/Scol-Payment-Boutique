"use client";

import { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
	ArrowLeft,
	Settings,
	CheckCircle,
	AlertCircle,
	XCircle,
	Zap,
	CreditCard,
	Building2,
	Smartphone,
	Globe,
	Shield,
	TrendingUp,
} from "lucide-react";
import Link from "next/link";

const pspProviders = [
	{
		id: "absa",
		name: "ABSA Pay",
		description: "South African bank payment solution",
		status: "connected",
		enabled: true,
		icon: Building2,
		features: [
			"Instant payments",
			"Bank-grade security",
			"Real-time notifications",
		],
		transactionFee: "1.5%",
		setupFee: "R 0",
		monthlyFee: "R 99",
		successRate: 96.2,
		avgProcessingTime: "1.8 min",
		supportedCurrencies: ["ZAR"],
		color: "bg-chart-3",
	},
	{
		id: "capitec",
		name: "Capitec Pay",
		description: "Digital banking payment platform",
		status: "connected",
		enabled: true,
		icon: Smartphone,
		features: ["Mobile-first", "QR code payments", "Instant settlements"],
		transactionFee: "1.2%",
		setupFee: "R 0",
		monthlyFee: "R 79",
		successRate: 94.8,
		avgProcessingTime: "2.1 min",
		supportedCurrencies: ["ZAR"],
		color: "bg-blue-700",
	},
	{
		id: "payshap",
		name: "PayShap",
		description: "Instant payment network",
		status: "connected",
		enabled: true,
		icon: Zap,
		features: ["24/7 payments", "Instant transfers", "Low fees"],
		transactionFee: "0.8%",
		setupFee: "R 0",
		monthlyFee: "R 49",
		successRate: 91.5,
		avgProcessingTime: "2.4 min",
		supportedCurrencies: ["ZAR"],
		color: "bg-chart-4",
	},
	{
		id: "card",
		name: "Card Payments",
		description: "Visa, Mastercard, and local cards",
		status: "connected",
		enabled: true,
		icon: CreditCard,
		features: ["Global acceptance", "3D Secure", "Fraud protection"],
		transactionFee: "2.9%",
		setupFee: "R 0",
		monthlyFee: "R 199",
		successRate: 89.3,
		avgProcessingTime: "3.2 min",
		supportedCurrencies: ["ZAR", "USD", "EUR", "GBP"],
		color: "bg-purple-500",
	},
	{
		id: "eft",
		name: "EFT Payments",
		description: "Electronic funds transfer",
		status: "connected",
		enabled: false,
		icon: Globe,
		features: ["Bank transfers", "Batch processing", "Low cost"],
		transactionFee: "0.5%",
		setupFee: "R 0",
		monthlyFee: "R 29",
		successRate: 87.1,
		avgProcessingTime: "4.1 min",
		supportedCurrencies: ["ZAR"],
		color: "bg-orange-500",
	},
	{
		id: "instant-eft",
		name: "Instant EFT",
		description: "Real-time bank transfers",
		status: "pending",
		enabled: false,
		icon: TrendingUp,
		features: ["Real-time transfers", "Bank verification", "High security"],
		transactionFee: "1.8%",
		setupFee: "R 0",
		monthlyFee: "R 149",
		successRate: 92.7,
		avgProcessingTime: "1.5 min",
		supportedCurrencies: ["ZAR"],
		color: "bg-teal-500",
	},
];

export default function IntegrationsPage() {
	const [providers, setProviders] = useState(pspProviders);

	const toggleProvider = (id: string) => {
		setProviders((prev) =>
			prev.map((provider) =>
				provider.id === id
					? { ...provider, enabled: !provider.enabled }
					: provider,
			),
		);
	};

	const getStatusIcon = (status: string) => {
		switch (status) {
			case "connected":
				return <CheckCircle className="h-4 w-4 text-chart-4" />;
			case "pending":
				return <AlertCircle className="h-4 w-4 text-yellow-500" />;
			case "disconnected":
				return <XCircle className="h-4 w-4 text-chart-3" />;
			default:
				return <AlertCircle className="h-4 w-4 text-gray-500" />;
		}
	};

	const getStatusBadge = (status: string) => {
		switch (status) {
			case "connected":
				return (
					<Badge variant="default" className="bg-chart-4">
						Connected
					</Badge>
				);
			case "pending":
				return <Badge variant="secondary">Pending</Badge>;
			case "disconnected":
				return <Badge variant="destructive">Disconnected</Badge>;
			default:
				return <Badge variant="outline">Unknown</Badge>;
		}
	};

	return (
		<div className="min-h-screen">
			{/* Header */}
			<header className="border-b border-border bg-card/80 backdrop-blur-sm">
				<div className="container mx-auto px-6 py-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-4">
							<Link href="/">
								<Button variant="ghost" size="sm">
									<ArrowLeft className="h-4 w-4 mr-2" />
									Back to Dashboard
								</Button>
							</Link>
							<div className="flex items-center gap-2">
								<Settings className="h-6 w-6 text-primary" />
								<h1 className="text-xl font-bold text-foreground">
									Payment Integrations
								</h1>
							</div>
						</div>
						<Button>
							<Shield className="h-4 w-4 mr-2" />
							Security Settings
						</Button>
					</div>
				</div>
			</header>

			<div className="container mx-auto px-6 py-8">
				<Tabs defaultValue="providers" className="space-y-6">
					<TabsList className="grid w-full grid-cols-4">
						<TabsTrigger value="providers" className="text-foreground">
							Payment Providers
						</TabsTrigger>
						<TabsTrigger value="routing" className="text-foreground">
							Payment Routing
						</TabsTrigger>
						<TabsTrigger value="settings" className="text-foreground">
							Configuration
						</TabsTrigger>
						<TabsTrigger value="monitoring" className="text-foreground">
							Monitoring
						</TabsTrigger>
					</TabsList>

					<TabsContent value="providers" className="space-y-6">
						{/* Overview Stats */}
						<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium text-foreground">
										Connected Providers
									</CardTitle>
									<CheckCircle className="h-4 w-4 text-chart-4" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold text-foreground">
										{providers.filter((p) => p.status === "connected").length}
									</div>
									<p className="text-xs text-muted-foreground">
										of {providers.length} total
									</p>
								</CardContent>
							</Card>

							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium text-foreground">
										Active Providers
									</CardTitle>
									<Zap className="h-4 w-4 text-primary" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold text-foreground">
										{providers.filter((p) => p.enabled).length}
									</div>
									<p className="text-xs text-muted-foreground">currently enabled</p>
								</CardContent>
							</Card>

							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium text-foreground">
										Avg Success Rate
									</CardTitle>
									<TrendingUp className="h-4 w-4 text-gray-400" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold text-foreground">
										{(
											providers
												.filter((p) => p.enabled)
												.reduce((acc, p) => acc + p.successRate, 0) /
											providers.filter((p) => p.enabled).length
										).toFixed(1)}
										%
									</div>
									<p className="text-xs text-muted-foreground">
										across active providers
									</p>
								</CardContent>
							</Card>

							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium text-foreground">
										Monthly Fees
									</CardTitle>
									<CreditCard className="h-4 w-4 text-gray-400" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold text-foreground">
										R{" "}
										{providers
											.filter((p) => p.enabled)
											.reduce(
												(acc, p) =>
													acc + Number.parseInt(p.monthlyFee.replace("R ", "")),
												0,
											)}
									</div>
									<p className="text-xs text-muted-foreground">total monthly cost</p>
								</CardContent>
							</Card>
						</div>

						{/* Provider Cards */}
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
							{providers.map((provider) => {
								const IconComponent = provider.icon;
								return (
									<Card key={provider.id} className="relative">
										<CardHeader>
											<div className="flex items-center justify-between">
												<div className="flex items-center gap-3">
													<div
														className={`p-2 rounded-md ${provider.color} text-foreground`}
													>
														<IconComponent className="h-5 w-5" />
													</div>
													<div>
														<CardTitle className="text-lg text-foreground">
															{provider.name}
														</CardTitle>
														<CardDescription className="text-muted-foreground">
															{provider.description}
														</CardDescription>
													</div>
												</div>
												<div className="flex items-center gap-2">
													{getStatusIcon(provider.status)}
													{getStatusBadge(provider.status)}
												</div>
											</div>
										</CardHeader>
										<CardContent className="space-y-4">
											{/* Features */}
											<div>
												<h4 className="text-sm font-medium mb-2 text-foreground">
													Features
												</h4>
												<div className="flex flex-wrap gap-1">
													{provider.features.map((feature, index) => (
														<Badge
															key={index}
															variant="outline"
															className="text-xs text-foreground border-white/[0.1]"
														>
															{feature}
														</Badge>
													))}
												</div>
											</div>

											{/* Pricing */}
											<div className="grid grid-cols-3 gap-4 text-sm">
												<div>
													<p className="text-muted-foreground">Transaction Fee</p>
													<p className="font-medium text-foreground">
														{provider.transactionFee}
													</p>
												</div>
												<div>
													<p className="text-muted-foreground">Setup Fee</p>
													<p className="font-medium text-foreground">
														{provider.setupFee}
													</p>
												</div>
												<div>
													<p className="text-muted-foreground">Monthly Fee</p>
													<p className="font-medium text-foreground">
														{provider.monthlyFee}
													</p>
												</div>
											</div>

											{/* Performance */}
											<div className="grid grid-cols-2 gap-4 text-sm">
												<div>
													<p className="text-muted-foreground">Success Rate</p>
													<p className="font-medium text-foreground">
														{provider.successRate}%
													</p>
												</div>
												<div>
													<p className="text-muted-foreground">Avg Processing</p>
													<p className="font-medium text-foreground">
														{provider.avgProcessingTime}
													</p>
												</div>
											</div>

											{/* Supported Currencies */}
											<div>
												<p className="text-muted-foreground text-sm mb-1">
													Supported Currencies
												</p>
												<div className="flex gap-1">
													{provider.supportedCurrencies.map((currency) => (
														<Badge
															key={currency}
															variant="secondary"
															className="text-xs text-foreground bg-gray-600"
														>
															{currency}
														</Badge>
													))}
												</div>
											</div>

											{/* Controls */}
											<div className="flex items-center justify-between pt-4 border-t">
												<div className="flex items-center gap-2">
													<Switch
														checked={provider.enabled}
														onCheckedChange={() => toggleProvider(provider.id)}
														disabled={provider.status !== "connected"}
													/>
													<span className="text-sm text-foreground">
														{provider.enabled ? "Enabled" : "Disabled"}
													</span>
												</div>
												<div className="flex gap-2">
													{provider.status === "connected" ? (
														<Button variant="outline" size="sm">
															Configure
														</Button>
													) : provider.status === "pending" ? (
														<Button variant="outline" size="sm">
															Complete Setup
														</Button>
													) : (
														<Button size="sm">Connect</Button>
													)}
												</div>
											</div>
										</CardContent>
									</Card>
								);
							})}
						</div>
					</TabsContent>

					<TabsContent value="routing" className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle className="text-foreground">
									Payment Routing Rules
								</CardTitle>
								<CardDescription className="text-muted-foreground">
									Configure how payments are routed across different providers
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								<div className="space-y-4">
									<h3 className="text-lg font-semibold text-foreground">
										Primary Routing Strategy
									</h3>
									<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
										<Card className="p-4 cursor-pointer border-2 border-primary">
											<div className="text-center">
												<TrendingUp className="h-8 w-8 mx-auto mb-2 text-primary" />
												<h4 className="font-medium text-foreground">Success Rate</h4>
												<p className="text-sm text-muted-foreground">
													Route to highest success rate
												</p>
											</div>
										</Card>
										<Card className="p-4 cursor-pointer">
											<div className="text-center">
												<CreditCard className="h-8 w-8 mx-auto mb-2 text-gray-400" />
												<h4 className="font-medium text-foreground">Lowest Cost</h4>
												<p className="text-sm text-muted-foreground">
													Route to lowest fees
												</p>
											</div>
										</Card>
										<Card className="p-4 cursor-pointer">
											<div className="text-center">
												<Zap className="h-8 w-8 mx-auto mb-2 text-gray-400" />
												<h4 className="font-medium text-foreground">Fastest</h4>
												<p className="text-sm text-muted-foreground">
													Route to fastest processing
												</p>
											</div>
										</Card>
									</div>
								</div>

								<div className="space-y-4">
									<h3 className="text-lg font-semibold text-foreground">
										Fallback Configuration
									</h3>
									<div className="space-y-3">
										{[
											{
												priority: 1,
												provider: "ABSA Pay",
												reason: "Highest success rate (96.2%)",
											},
											{
												priority: 2,
												provider: "Capitec Pay",
												reason: "Good performance (94.8%)",
											},
											{
												priority: 3,
												provider: "PayShap",
												reason: "Low cost fallback (0.8%)",
											},
											{
												priority: 4,
												provider: "Card Payments",
												reason: "Global acceptance",
											},
										].map((rule) => (
											<div
												key={rule.priority}
												className="flex items-center justify-between p-3 border border-border rounded-md"
											>
												<div className="flex items-center gap-3">
													<Badge
														variant="outline"
														className="text-foreground border-white/[0.1]"
													>
														#{rule.priority}
													</Badge>
													<div>
														<p className="font-medium text-foreground">
															{rule.provider}
														</p>
														<p className="text-sm text-muted-foreground">
															{rule.reason}
														</p>
													</div>
												</div>
												<Button variant="ghost" size="sm">
													<Settings className="h-4 w-4" />
												</Button>
											</div>
										))}
									</div>
								</div>

								<div className="space-y-4">
									<h3 className="text-lg font-semibold text-foreground">
										Smart Routing Rules
									</h3>
									<div className="space-y-3">
										<div className="flex items-center justify-between p-3 border border-border rounded-md">
											<div>
												<p className="font-medium text-foreground">
													Amount-based routing
												</p>
												<p className="text-sm text-muted-foreground">
													Use PayShap for amounts under R 100
												</p>
											</div>
											<Switch defaultChecked />
										</div>
										<div className="flex items-center justify-between p-3 border border-border rounded-md">
											<div>
												<p className="font-medium text-foreground">
													Currency-based routing
												</p>
												<p className="text-sm text-muted-foreground">
													Use Card Payments for non-ZAR transactions
												</p>
											</div>
											<Switch defaultChecked />
										</div>
										<div className="flex items-center justify-between p-3 border border-border rounded-md">
											<div>
												<p className="font-medium text-foreground">
													Time-based routing
												</p>
												<p className="text-sm text-muted-foreground">
													Prefer faster providers during business hours
												</p>
											</div>
											<Switch />
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="settings" className="space-y-6">
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
							<Card>
								<CardHeader>
									<CardTitle className="text-foreground">Global Settings</CardTitle>
									<CardDescription className="text-muted-foreground">
										Configure global payment processing settings
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="flex items-center justify-between">
										<div>
											<p className="font-medium text-foreground">
												Auto-retry failed payments
											</p>
											<p className="text-sm text-muted-foreground">
												Automatically retry with fallback providers
											</p>
										</div>
										<Switch defaultChecked />
									</div>
									<div className="flex items-center justify-between">
										<div>
											<p className="font-medium text-foreground">
												Real-time notifications
											</p>
											<p className="text-sm text-muted-foreground">
												Send webhooks for payment events
											</p>
										</div>
										<Switch defaultChecked />
									</div>
									<div className="flex items-center justify-between">
										<div>
											<p className="font-medium text-foreground">Fraud detection</p>
											<p className="text-sm text-muted-foreground">
												Enable advanced fraud screening
											</p>
										</div>
										<Switch defaultChecked />
									</div>
									<div className="flex items-center justify-between">
										<div>
											<p className="font-medium text-foreground">3D Secure</p>
											<p className="text-sm text-muted-foreground">
												Require 3D Secure for card payments
											</p>
										</div>
										<Switch />
									</div>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle className="text-foreground">
										Retry Configuration
									</CardTitle>
									<CardDescription className="text-muted-foreground">
										Configure retry logic for failed payments
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="space-y-2">
										<label className="text-sm font-medium text-foreground">
											Maximum retry attempts
										</label>
										<select
											className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground"
											defaultValue="3"
										>
											<option value="1" className="text-foreground bg-input">
												1 attempt
											</option>
											<option value="2" className="text-foreground bg-input">
												2 attempts
											</option>
											<option value="3" className="text-foreground bg-input">
												3 attempts
											</option>
											<option value="5" className="text-foreground bg-input">
												5 attempts
											</option>
										</select>
									</div>
									<div className="space-y-2">
										<label className="text-sm font-medium text-foreground">
											Retry delay
										</label>
										<select
											className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground"
											defaultValue="1m"
										>
											<option value="immediate" className="text-foreground bg-input">
												Immediate
											</option>
											<option value="30s" className="text-foreground bg-input">
												30 seconds
											</option>
											<option value="1m" className="text-foreground bg-input">
												1 minute
											</option>
											<option value="5m" className="text-foreground bg-input">
												5 minutes
											</option>
										</select>
									</div>
									<div className="space-y-2">
										<label className="text-sm font-medium text-foreground">
											Timeout duration
										</label>
										<select
											className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground"
											defaultValue="60s"
										>
											<option value="30s" className="text-foreground bg-input">
												30 seconds
											</option>
											<option value="60s" className="text-foreground bg-input">
												60 seconds
											</option>
											<option value="120s" className="text-foreground bg-input">
												2 minutes
											</option>
											<option value="300s" className="text-foreground bg-input">
												5 minutes
											</option>
										</select>
									</div>
								</CardContent>
							</Card>
						</div>

						<Card>
							<CardHeader>
								<CardTitle className="text-foreground">
									Webhook Configuration
								</CardTitle>
								<CardDescription className="text-muted-foreground">
									Configure webhook endpoints for payment events
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-2">
									<label className="text-sm font-medium text-foreground">
										Webhook URL
									</label>
									<input
										type="url"
										placeholder="https://your-domain.com/webhooks/payments"
										className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground"
									/>
								</div>
								<div className="space-y-2">
									<label className="text-sm font-medium text-foreground">
										Events to send
									</label>
									<div className="grid grid-cols-2 gap-2">
										{[
											"payment.completed",
											"payment.failed",
											"payment.pending",
											"payment.refunded",
											"emandate.created",
											"emandate.activated",
										].map((event) => (
											<label
												key={event}
												className="flex items-center space-x-2"
											>
												<input
													type="checkbox"
													className="rounded border-border"
													defaultChecked
												/>
												<span className="text-sm text-foreground">{event}</span>
											</label>
										))}
									</div>
								</div>
								<Button>Test Webhook</Button>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="monitoring" className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium text-foreground">
										System Health
									</CardTitle>
									<CheckCircle className="h-4 w-4 text-chart-4" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold text-chart-4">
										Healthy
									</div>
									<p className="text-xs text-muted-foreground">
										All systems operational
									</p>
								</CardContent>
							</Card>

							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium text-foreground">
										Response Time
									</CardTitle>
									<Zap className="h-4 w-4 text-gray-400" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold text-foreground">247ms</div>
									<p className="text-xs text-muted-foreground">Average API response</p>
								</CardContent>
							</Card>

							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium text-foreground">
										Uptime
									</CardTitle>
									<TrendingUp className="h-4 w-4 text-gray-400" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold text-foreground">99.9%</div>
									<p className="text-xs text-muted-foreground">Last 30 days</p>
								</CardContent>
							</Card>

							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium text-foreground">
										Error Rate
									</CardTitle>
									<AlertCircle className="h-4 w-4 text-gray-400" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold text-foreground">0.1%</div>
									<p className="text-xs text-muted-foreground">Last 24 hours</p>
								</CardContent>
							</Card>
						</div>

						<Card>
							<CardHeader>
								<CardTitle className="text-foreground">Provider Status</CardTitle>
								<CardDescription className="text-muted-foreground">
									Real-time status of all payment providers
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{providers
										.filter((p) => p.status === "connected")
										.map((provider) => (
											<div
												key={provider.id}
												className="flex items-center justify-between p-3 border border-border rounded-md"
											>
												<div className="flex items-center gap-3">
													<div className="h-3 w-3 rounded-full bg-chart-4"></div>
													<div>
														<p className="font-medium text-foreground">
															{provider.name}
														</p>
														<p className="text-sm text-muted-foreground">
															Last transaction: 2 minutes ago
														</p>
													</div>
												</div>
												<div className="grid grid-cols-3 gap-6 text-right text-sm">
													<div>
														<p className="font-medium text-foreground">156ms</p>
														<p className="text-muted-foreground">Response time</p>
													</div>
													<div>
														<p className="font-medium text-foreground">
															{provider.successRate}%
														</p>
														<p className="text-muted-foreground">Success rate</p>
													</div>
													<div>
														<p className="font-medium text-foreground">1,247</p>
														<p className="text-muted-foreground">Transactions today</p>
													</div>
												</div>
											</div>
										))}
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="text-foreground">Recent Events</CardTitle>
								<CardDescription className="text-muted-foreground">
									Latest system events and alerts
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-3">
									{[
										{
											time: "2 min ago",
											event: "Payment completed",
											provider: "ABSA Pay",
											status: "success",
										},
										{
											time: "5 min ago",
											event: "Retry attempt",
											provider: "Capitec Pay",
											status: "warning",
										},
										{
											time: "8 min ago",
											event: "Payment failed",
											provider: "Card Payments",
											status: "error",
										},
										{
											time: "12 min ago",
											event: "eMandate created",
											provider: "PayShap",
											status: "success",
										},
										{
											time: "15 min ago",
											event: "Webhook delivered",
											provider: "System",
											status: "success",
										},
									].map((event, index) => (
										<div
											key={index}
											className="flex items-center justify-between p-2 text-sm"
										>
											<div className="flex items-center gap-3">
												<div
													className={`h-2 w-2 rounded-full ${
														event.status === "success"
															? "bg-chart-4"
															: event.status === "warning"
																? "bg-yellow-500"
																: "bg-chart-3"
													}`}
												></div>
												<span className="text-foreground">{event.event}</span>
												<Badge
													variant="outline"
													className="text-xs text-foreground border-white/[0.1]"
												>
													{event.provider}
												</Badge>
											</div>
											<span className="text-muted-foreground">{event.time}</span>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
