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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	ArrowLeft,
	BarChart3,
	TrendingUp,
	TrendingDown,
	DollarSign,
	Users,
	LinkIcon,
	Clock,
	Download,
	Filter,
	CalendarIcon,
	CreditCard,
} from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";

export default function AnalyticsPage() {
	const [dateRange, setDateRange] = useState<{
		from: Date | undefined;
		to: Date | undefined;
	}>({
		from: new Date(2024, 0, 1),
		to: new Date(),
	});
	const [selectedPSP, setSelectedPSP] = useState("all");
	const [selectedPeriod, setSelectedPeriod] = useState("30d");

	return (
		<div className="min-h-screen">
			{/* Header */}
			<header className="border-b border-border bg-card">
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
								<BarChart3 className="h-6 w-6 text-primary" />
								<h1 className="text-xl font-bold text-white">
									Analytics & Reporting
								</h1>
							</div>
						</div>
						<div className="flex items-center gap-2">
							<Button variant="ghost" size="sm" className="p-2">
								<Download className="h-4 w-4" />
							</Button>
							<Button variant="ghost" size="sm" className="p-2">
								<Filter className="h-4 w-4" />
							</Button>
						</div>
					</div>
				</div>
			</header>

			<div className="container mx-auto px-6 py-8">
				{/* Filters */}
				<Card className="mb-8">
					<CardHeader>
						<CardTitle className="text-lg text-white">Report Filters</CardTitle>
						<CardDescription className="text-gray-300">
							Customize your analytics view
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="space-y-2">
								<label className="text-sm font-medium text-white">
									Time Period
								</label>
								<Select
									value={selectedPeriod}
									onValueChange={setSelectedPeriod}
								>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="7d">Last 7 days</SelectItem>
										<SelectItem value="30d">Last 30 days</SelectItem>
										<SelectItem value="90d">Last 90 days</SelectItem>
										<SelectItem value="1y">Last year</SelectItem>
										<SelectItem value="custom">Custom range</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className="space-y-2">
								<label className="text-sm font-medium text-white">
									Payment Provider
								</label>
								<Select value={selectedPSP} onValueChange={setSelectedPSP}>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="all">All Providers</SelectItem>
										<SelectItem value="absa">ABSA Pay</SelectItem>
										<SelectItem value="capitec">Capitec Pay</SelectItem>
										<SelectItem value="payshap">PayShap</SelectItem>
										<SelectItem value="card">Card Payment</SelectItem>
										<SelectItem value="eft">EFT</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className="space-y-2">
								<label className="text-sm font-medium text-white">
									From Date
								</label>
								<Popover>
									<PopoverTrigger asChild>
										<Button
											variant="outline"
											className="w-full justify-start text-left font-normal bg-transparent"
										>
											<CalendarIcon className="mr-2 h-4 w-4" />
											{dateRange.from
												? format(dateRange.from, "PPP")
												: "Pick a date"}
										</Button>
									</PopoverTrigger>
									<PopoverContent className="w-auto p-0" align="start">
										<Calendar
											mode="single"
											selected={dateRange.from}
											onSelect={(date) =>
												setDateRange((prev) => ({ ...prev, from: date }))
											}
											initialFocus
										/>
									</PopoverContent>
								</Popover>
							</div>

							<div className="space-y-2">
								<label className="text-sm font-medium text-white">
									To Date
								</label>
								<Popover>
									<PopoverTrigger asChild>
										<Button
											variant="outline"
											className="w-full justify-start text-left font-normal bg-transparent"
										>
											<CalendarIcon className="mr-2 h-4 w-4" />
											{dateRange.to
												? format(dateRange.to, "PPP")
												: "Pick a date"}
										</Button>
									</PopoverTrigger>
									<PopoverContent className="w-auto p-0" align="start">
										<Calendar
											mode="single"
											selected={dateRange.to}
											onSelect={(date) =>
												setDateRange((prev) => ({ ...prev, to: date }))
											}
											initialFocus
										/>
									</PopoverContent>
								</Popover>
							</div>
						</div>
					</CardContent>
				</Card>

				<Tabs defaultValue="overview" className="space-y-6">
					<TabsList className="grid w-full grid-cols-5">
						<TabsTrigger
							value="overview"
							className="text-white data-[state=active]:text-black"
						>
							Overview
						</TabsTrigger>
						<TabsTrigger
							value="payments"
							className="text-white data-[state=active]:text-black"
						>
							Payment Links
						</TabsTrigger>
						<TabsTrigger
							value="emandate"
							className="text-white data-[state=active]:text-black"
						>
							eMandate
						</TabsTrigger>
						<TabsTrigger
							value="psp"
							className="text-white data-[state=active]:text-black"
						>
							PSP Performance
						</TabsTrigger>
						<TabsTrigger
							value="revenue"
							className="text-white data-[state=active]:text-black"
						>
							Revenue
						</TabsTrigger>
					</TabsList>

					<TabsContent value="overview" className="space-y-6">
						{/* Key Metrics */}
						<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium text-white">
										Total Revenue
									</CardTitle>
									<DollarSign className="h-4 w-4 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold text-white">
										R 2,847,392
									</div>
									<div className="flex items-center text-xs text-muted-foreground">
										<TrendingUp className="h-3 w-3 mr-1 text-green-500" />
										+18.2% from last period
									</div>
								</CardContent>
							</Card>

							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium text-white">
										Total Transactions
									</CardTitle>
									<BarChart3 className="h-4 w-4 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold text-white">12,847</div>
									<div className="flex items-center text-xs text-muted-foreground">
										<TrendingUp className="h-3 w-3 mr-1 text-green-500" />
										+12.4% from last period
									</div>
								</CardContent>
							</Card>

							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium text-white">
										Success Rate
									</CardTitle>
									<TrendingUp className="h-4 w-4 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold text-white">94.2%</div>
									<div className="flex items-center text-xs text-muted-foreground">
										<TrendingUp className="h-3 w-3 mr-1 text-green-500" />
										+2.1% from last period
									</div>
								</CardContent>
							</Card>

							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium text-white">
										Avg. Transaction Value
									</CardTitle>
									<DollarSign className="h-4 w-4 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold text-white">R 221</div>
									<div className="flex items-center text-xs text-muted-foreground">
										<TrendingDown className="h-3 w-3 mr-1 text-red-500" />
										-3.2% from last period
									</div>
								</CardContent>
							</Card>
						</div>

						{/* Charts */}
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
							<Card>
								<CardHeader>
									<CardTitle>Revenue Trend</CardTitle>
									<CardDescription>
										Daily revenue over the selected period
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="h-64 flex items-center justify-center border border-dashed border-border rounded-md">
										<div className="text-center text-muted-foreground">
											<BarChart3 className="h-12 w-12 mx-auto mb-2" />
											<p>Revenue Chart Placeholder</p>
											<p className="text-xs">
												Integration with charting library needed
											</p>
										</div>
									</div>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle>Transaction Volume</CardTitle>
									<CardDescription>
										Number of transactions per day
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="h-64 flex items-center justify-center border border-dashed border-border rounded-md">
										<div className="text-center text-muted-foreground">
											<TrendingUp className="h-12 w-12 mx-auto mb-2" />
											<p>Transaction Volume Chart Placeholder</p>
											<p className="text-xs">
												Integration with charting library needed
											</p>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>

						{/* Top Performing Links */}
						<Card>
							<CardHeader>
								<CardTitle>Top Performing Payment Links</CardTitle>
								<CardDescription>
									Highest revenue generating payment links
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{[
										{
											id: "PL001",
											description: "Enterprise Subscription",
											revenue: "R 125,400",
											transactions: 42,
											conversion: "89.2%",
										},
										{
											id: "PL002",
											description: "Professional Plan",
											revenue: "R 89,750",
											transactions: 156,
											conversion: "76.8%",
										},
										{
											id: "PL003",
											description: "Product Purchase",
											revenue: "R 67,200",
											transactions: 89,
											conversion: "82.1%",
										},
										{
											id: "PL004",
											description: "Service Fee",
											revenue: "R 45,600",
											transactions: 234,
											conversion: "65.4%",
										},
									].map((link, index) => (
										<div
											key={link.id}
											className="flex items-center justify-between p-3 border border-border rounded-md"
										>
											<div className="flex items-center gap-3">
												<Badge variant="outline">#{index + 1}</Badge>
												<div>
													<p className="font-medium">{link.description}</p>
													<p className="text-sm text-muted-foreground">
														{link.id}
													</p>
												</div>
											</div>
											<div className="grid grid-cols-3 gap-6 text-right text-sm">
												<div>
													<p className="font-medium">{link.revenue}</p>
													<p className="text-muted-foreground">Revenue</p>
												</div>
												<div>
													<p className="font-medium">{link.transactions}</p>
													<p className="text-muted-foreground">Transactions</p>
												</div>
												<div>
													<p className="font-medium">{link.conversion}</p>
													<p className="text-muted-foreground">Conversion</p>
												</div>
											</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="payments" className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">
										Active Links
									</CardTitle>
									<LinkIcon className="h-4 w-4 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">1,247</div>
									<p className="text-xs text-muted-foreground">
										+12% from last month
									</p>
								</CardContent>
							</Card>

							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">
										Total Clicks
									</CardTitle>
									<TrendingUp className="h-4 w-4 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">28,472</div>
									<p className="text-xs text-muted-foreground">
										+18% from last month
									</p>
								</CardContent>
							</Card>

							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">
										Conversion Rate
									</CardTitle>
									<BarChart3 className="h-4 w-4 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">68.4%</div>
									<p className="text-xs text-muted-foreground">
										+5.2% from last month
									</p>
								</CardContent>
							</Card>
						</div>

						<Card>
							<CardHeader>
								<CardTitle>Payment Link Performance</CardTitle>
								<CardDescription>
									Detailed analytics for all payment links
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{[
										{
											id: "PL001",
											description: "Invoice #INV-2024-001",
											clicks: 156,
											payments: 89,
											revenue: "R 22,500",
											conversion: "57.1%",
											status: "Active",
										},
										{
											id: "PL002",
											description: "Subscription Payment",
											clicks: 234,
											payments: 187,
											revenue: "R 55,813",
											conversion: "79.9%",
											status: "Active",
										},
										{
											id: "PL003",
											description: "Product Purchase",
											clicks: 89,
											payments: 67,
											revenue: "R 83,750",
											conversion: "75.3%",
											status: "Paid",
										},
										{
											id: "PL004",
											description: "Service Fee",
											clicks: 45,
											payments: 12,
											revenue: "R 9,000",
											conversion: "26.7%",
											status: "Expired",
										},
									].map((link) => (
										<Card key={link.id} className="p-4">
											<div className="flex items-center justify-between">
												<div className="flex-1">
													<div className="flex items-center gap-3 mb-2">
														<h4 className="font-medium">{link.description}</h4>
														<Badge
															variant={
																link.status === "Active"
																	? "secondary"
																	: link.status === "Paid"
																		? "default"
																		: "destructive"
															}
														>
															{link.status}
														</Badge>
													</div>
													<div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
														<div>
															<p className="text-muted-foreground">Clicks</p>
															<p className="font-medium">{link.clicks}</p>
														</div>
														<div>
															<p className="text-muted-foreground">Payments</p>
															<p className="font-medium">{link.payments}</p>
														</div>
														<div>
															<p className="text-muted-foreground">Revenue</p>
															<p className="font-medium">{link.revenue}</p>
														</div>
														<div>
															<p className="text-muted-foreground">
																Conversion
															</p>
															<p className="font-medium">{link.conversion}</p>
														</div>
														<div>
															<p className="text-muted-foreground">Link ID</p>
															<p className="font-medium text-xs">{link.id}</p>
														</div>
													</div>
												</div>
											</div>
										</Card>
									))}
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="emandate" className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">
										Total Registrations
									</CardTitle>
									<Users className="h-4 w-4 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">2,847</div>
									<p className="text-xs text-muted-foreground">
										+15% from last month
									</p>
								</CardContent>
							</Card>

							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">
										Completion Rate
									</CardTitle>
									<TrendingUp className="h-4 w-4 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">78.4%</div>
									<p className="text-xs text-muted-foreground">
										+8.2% from last month
									</p>
								</CardContent>
							</Card>

							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">
										Avg. Completion Time
									</CardTitle>
									<Clock className="h-4 w-4 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">4.2 min</div>
									<p className="text-xs text-muted-foreground">
										-1.3 min from last month
									</p>
								</CardContent>
							</Card>

							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">
										Monthly Recurring
									</CardTitle>
									<DollarSign className="h-4 w-4 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">R 847K</div>
									<p className="text-xs text-muted-foreground">
										+22% from last month
									</p>
								</CardContent>
							</Card>
						</div>

						<Card>
							<CardHeader>
								<CardTitle>Registration Funnel Analysis</CardTitle>
								<CardDescription>Step-by-step completion rates</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{[
										{
											step: "Product Selection",
											started: 3847,
											completed: 3654,
											rate: "95.0%",
										},
										{
											step: "Contact Details",
											started: 3654,
											completed: 3421,
											rate: "93.6%",
										},
										{
											step: "Banking Details",
											started: 3421,
											completed: 3156,
											rate: "92.3%",
										},
										{
											step: "Verification",
											started: 3156,
											completed: 2934,
											rate: "93.0%",
										},
										{
											step: "Confirmation",
											started: 2934,
											completed: 2847,
											rate: "97.0%",
										},
									].map((step, index) => (
										<div
											key={step.step}
											className="flex items-center justify-between p-4 border border-border rounded-md"
										>
											<div className="flex items-center gap-4">
												<div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium">
													{index + 1}
												</div>
												<div>
													<p className="font-medium">{step.step}</p>
													<p className="text-sm text-muted-foreground">
														{step.completed} of {step.started} completed
													</p>
												</div>
											</div>
											<div className="text-right">
												<p className="text-lg font-bold">{step.rate}</p>
												<p className="text-sm text-muted-foreground">
													Completion rate
												</p>
											</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="psp" className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle>Payment Service Provider Performance</CardTitle>
								<CardDescription>
									Detailed analytics by payment method
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{[
										{
											psp: "ABSA Pay",
											transactions: 4247,
											revenue: "R 847,392",
											success: 96.2,
											avgTime: "1.8 min",
											color: "bg-chart-1",
										},
										{
											psp: "Capitec Pay",
											transactions: 3892,
											revenue: "R 723,156",
											success: 94.8,
											avgTime: "2.1 min",
											color: "bg-chart-2",
										},
										{
											psp: "PayShap",
											transactions: 2654,
											revenue: "R 534,789",
											success: 91.5,
											avgTime: "2.4 min",
											color: "bg-chart-3",
										},
										{
											psp: "Card Payment",
											transactions: 5156,
											revenue: "R 1,234,567",
											success: 89.3,
											avgTime: "3.2 min",
											color: "bg-chart-4",
										},
										{
											psp: "EFT",
											transactions: 1423,
											revenue: "R 289,456",
											success: 87.1,
											avgTime: "4.1 min",
											color: "bg-chart-5",
										},
									].map((psp) => (
										<Card key={psp.psp} className="p-4">
											<div className="flex items-center justify-between">
												<div className="flex items-center gap-4">
													<div
														className={`h-4 w-4 rounded-full ${psp.color}`}
													></div>
													<div>
														<h4 className="font-medium">{psp.psp}</h4>
														<p className="text-sm text-muted-foreground">
															{psp.transactions} transactions
														</p>
													</div>
												</div>
												<div className="grid grid-cols-3 gap-8 text-right text-sm">
													<div>
														<p className="font-medium">{psp.revenue}</p>
														<p className="text-muted-foreground">Revenue</p>
													</div>
													<div>
														<p className="font-medium">{psp.success}%</p>
														<p className="text-muted-foreground">
															Success Rate
														</p>
													</div>
													<div>
														<p className="font-medium">{psp.avgTime}</p>
														<p className="text-muted-foreground">Avg. Time</p>
													</div>
												</div>
											</div>
										</Card>
									))}
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="revenue" className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">
										Total Revenue
									</CardTitle>
									<DollarSign className="h-4 w-4 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">R 2,847,392</div>
									<p className="text-xs text-muted-foreground">
										+18.2% from last period
									</p>
								</CardContent>
							</Card>

							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">
										Recurring Revenue
									</CardTitle>
									<TrendingUp className="h-4 w-4 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">R 1,234,567</div>
									<p className="text-xs text-muted-foreground">
										+25.4% from last period
									</p>
								</CardContent>
							</Card>

							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">
										One-time Payments
									</CardTitle>
									<CreditCard className="h-4 w-4 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">R 1,612,825</div>
									<p className="text-xs text-muted-foreground">
										+12.8% from last period
									</p>
								</CardContent>
							</Card>
						</div>

						<Card>
							<CardHeader>
								<CardTitle>Revenue Breakdown</CardTitle>
								<CardDescription>
									Revenue by payment type and period
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="h-64 flex items-center justify-center border border-dashed border-border rounded-md">
									<div className="text-center text-muted-foreground">
										<DollarSign className="h-12 w-12 mx-auto mb-2" />
										<p>Revenue Breakdown Chart Placeholder</p>
										<p className="text-xs">
											Integration with charting library needed
										</p>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Top Revenue Sources</CardTitle>
								<CardDescription>
									Highest earning payment methods and products
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{[
										{
											source: "Enterprise Subscriptions",
											revenue: "R 847,392",
											percentage: "29.8%",
											growth: "+22%",
										},
										{
											source: "Professional Plans",
											revenue: "R 634,156",
											percentage: "22.3%",
											growth: "+18%",
										},
										{
											source: "One-time Purchases",
											revenue: "R 523,789",
											percentage: "18.4%",
											growth: "+15%",
										},
										{
											source: "Basic Subscriptions",
											revenue: "R 456,234",
											percentage: "16.0%",
											growth: "+12%",
										},
										{
											source: "Service Fees",
											revenue: "R 385,821",
											percentage: "13.5%",
											growth: "+8%",
										},
									].map((source, index) => (
										<div
											key={source.source}
											className="flex items-center justify-between p-3 border border-border rounded-md"
										>
											<div className="flex items-center gap-3">
												<Badge variant="outline">#{index + 1}</Badge>
												<div>
													<p className="font-medium">{source.source}</p>
													<p className="text-sm text-muted-foreground">
														{source.percentage} of total revenue
													</p>
												</div>
											</div>
											<div className="text-right">
												<p className="font-medium">{source.revenue}</p>
												<p className="text-sm text-green-600">
													{source.growth}
												</p>
											</div>
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
