"use client";

import { format } from "date-fns";
import {
  BarChart3,
  CalendarIcon,
  Clock,
  Copy,
  CreditCard,
  DollarSign,
  ExternalLink,
  Settings,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PaymentSystemDashboard() {
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: new Date(2024, 0, 1),
    to: new Date(),
  });

	return (
		<div className="min-h-screen">
			{/* Header */}
			<header className="border-b border-border bg-card/80 backdrop-blur-sm">
				<div className="container mx-auto px-6 py-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-4">
							<div className="flex items-center gap-2">
								<div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
									<span className="text-primary-foreground text-sm font-bold">
										S
									</span>
								</div>
								<h1 className="text-2xl font-bold text-card-foreground">
									StratCol
								</h1>
							</div>
							<Badge variant="secondary" className="text-xs">
								Payment Hub
							</Badge>
						</div>
					<div className="flex items-center gap-1">
						<Tooltip>
							<TooltipTrigger asChild>
								<Link href="/analytics">
									<Button variant="ghost" size="icon" className="size-9">
										<BarChart3 className="h-4 w-4" />
									</Button>
								</Link>
							</TooltipTrigger>
							<TooltipContent side="bottom">View Analytics</TooltipContent>
						</Tooltip>
						<Tooltip>
							<TooltipTrigger asChild>
								<Link href="/integrations">
									<Button variant="ghost" size="icon" className="size-9">
										<Settings className="h-4 w-4" />
									</Button>
								</Link>
							</TooltipTrigger>
							<TooltipContent side="bottom">Manage Integrations</TooltipContent>
						</Tooltip>
						<div className="w-px h-5 bg-border mx-2" />
						<Tooltip>
							<TooltipTrigger asChild>
								<Button variant="ghost" size="icon" className="size-9">
									<Bell className="h-4 w-4" />
								</Button>
							</TooltipTrigger>
							<TooltipContent side="bottom">Notifications</TooltipContent>
						</Tooltip>
						<div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center ml-2">
							<span className="text-primary-foreground text-sm font-medium">
								JD
							</span>
						</div>
					</div>
					</div>
				</div>
			</header>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">
                eMandate Registrations
              </CardTitle>
              <Users className="h-4 w-4 gold-gradient-icon" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">892</div>
              <p className="text-xs text-muted-foreground">
                +8% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">
                Total Revenue
              </CardTitle>
              <BarChart3 className="h-4 w-4 gold-gradient-icon" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">
                R2.4M
              </div>
              <p className="text-xs text-muted-foreground">
                +15% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">
                Success Rate
              </CardTitle>
              <CreditCard className="h-4 w-4 gold-gradient-icon" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">
                94.2%
              </div>
              <p className="text-xs text-muted-foreground">
                +2.1% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="mt-8">
          <TabsList className="grid w-full grid-cols-4 bg-card border border-border">
            <TabsTrigger
              value="overview"
              className="text-foreground data-[state=active]:text-primary"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="create"
              className="text-foreground data-[state=active]:text-primary"
            >
              Create Link
            </TabsTrigger>
            <TabsTrigger
              value="manage"
              className="text-foreground data-[state=active]:text-primary"
            >
              Manage Links
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="text-foreground data-[state=active]:text-primary"
            >
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Payment Link Generation */}
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-card-foreground">
                    <ExternalLink className="h-5 w-5 text-primary" />
                    Quick Payment Link
                  </CardTitle>
                  <CardDescription>
                    Generate a payment link instantly
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Input
                        type="text"
                        placeholder="R 0.00"
                        className="w-full px-3 py-2 border border-border rounded-md bg-input text-card-foreground placeholder:text-muted-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ZAR">ZAR</SelectItem>
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="EUR">EUR</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      className="text-sm font-medium text-card-foreground"
                      htmlFor="description"
                    >
                      Description
                    </label>
                    <input
                      id="description"
                      type="text"
                      placeholder="Payment for..."
                      className="w-full px-3 py-2 border border-border rounded-md bg-input text-card-foreground placeholder:text-muted-foreground"
                    />
                  </div>

                  <Button className="w-full">Generate Quick Link</Button>
                </CardContent>
              </Card>

              {/* eMandate Onboarding */}
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary/70 text-xl">
                    <Users className="h-5 w-5 text-primary" />
                    eMandate Registration
                  </CardTitle>
                  <CardDescription>
                    Streamlined debit order registration
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border border-border rounded-md">
                      <div>
                        <h4 className="font-medium text-card-foreground">
                          Product Selection
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Choose subscription type
                        </p>
                      </div>
                      <Badge variant="secondary">Step 1</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 border border-border rounded-md">
                      <div>
                        <h4 className="font-medium text-card-foreground">
                          Banking Details
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Account information
                        </p>
                      </div>
                      <Badge variant="secondary" className="text-primary">
                        Step 2
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 border border-border rounded-md">
                      <div>
                        <h4 className="font-medium text-card-foreground">
                          Verification
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Identity confirmation
                        </p>
                      </div>
                      <Badge variant="secondary" className="text-primary">
                        Step 3
                      </Badge>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link href="/emandate" className="flex-1">
                      <Button
                        className="w-full bg-transparent"
                        variant="outline"
                      >
                        Start eMandate Process
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest payment links and eMandate registrations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      type: "Payment Link",
                      amount: "R 1,250.00",
                      status: "Active",
                      time: "2 hours ago",
                    },
                    {
                      type: "eMandate",
                      amount: "R 299.00",
                      status: "Completed",
                      time: "4 hours ago",
                    },
                    {
                      type: "Payment Link",
                      amount: "R 850.00",
                      status: "Paid",
                      time: "6 hours ago",
                    },
                    {
                      type: "eMandate",
                      amount: "R 199.00",
                      status: "Pending",
                      time: "8 hours ago",
                    },
                  ].map((activity, index) => (
                    <div
                      key={`${activity.type}-${index}`}
                      className="flex items-center justify-between p-3 border border-border rounded-md"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                        <div>
                          <p className="font-medium">{activity.type}</p>
                          <p className="text-sm text-muted-foreground">
                            {activity.amount}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={
                            activity.status === "Completed" ||
                            activity.status === "Paid"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {activity.status}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

					{/* Recent Activity */}
						<Card>
							<CardHeader>
								<CardTitle>Recent Activity</CardTitle>
								<CardDescription>
									Latest payment links and eMandate registrations
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{[
										{
											type: "Payment Link",
											amount: "R 1,250.00",
											status: "Active",
											time: "2 hours ago",
										},
										{
											type: "eMandate",
											amount: "R 299.00",
											status: "Completed",
											time: "4 hours ago",
										},
										{
											type: "Payment Link",
											amount: "R 850.00",
											status: "Paid",
											time: "6 hours ago",
										},
										{
											type: "eMandate",
											amount: "R 199.00",
											status: "Pending",
											time: "8 hours ago",
										},
									].map((activity, index) => (
										<div
											key={`${activity.type}-${index}`}
											className="flex items-center justify-between p-3 border border-border rounded-md"
										>
											<div className="flex items-center gap-3">
												<div className="h-2 w-2 rounded-full bg-primary"></div>
												<div>
													<p className="font-medium">{activity.type}</p>
													<p className="text-sm text-muted-foreground">
														{activity.amount}
													</p>
												</div>
											</div>
											<div className="text-right">
												<Badge
													variant={
														activity.status === "Completed" ||
														activity.status === "Paid"
															? "default"
															: "secondary"
													}
												>
													{activity.status}
												</Badge>
												<p className="text-xs text-muted-foreground mt-1">
													{activity.time}
												</p>
											</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</TabsContent>

                    <div className="space-y-2">
                      <Label htmlFor="paymentDescription">
                        Payment Description
                      </Label>
                      <textarea
                        id="paymentDescription"
                        placeholder="Detailed payment description..."
                        className="stratcol-input !h-20 resize-none"
                      />
                    </div>

                    <div className="space-y-4">
                      <Label>Date Range</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label
                            htmlFor="fromDate"
                            className="text-muted-foreground"
                          >
                            From
                          </Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal bg-transparent"
                              >
                                <CalendarIcon className="mr-2 h-4 w-4 gold-gradient-icon" />
                                {dateRange.from
                                  ? format(dateRange.from, "PPP")
                                  : "Pick a date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={dateRange.from}
                                onSelect={(date) =>
                                  setDateRange((prev) => ({
                                    ...prev,
                                    from: date,
                                  }))
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="toDate"
                            className="text-muted-foreground"
                          >
                            To
                          </Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal bg-transparent"
                              >
                                <CalendarIcon className="mr-2 h-4 w-4 gold-gradient-icon" />
                                {dateRange.to
                                  ? format(dateRange.to, "PPP")
                                  : "Pick a date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={dateRange.to}
                                onSelect={(date) =>
                                  setDateRange((prev) => ({
                                    ...prev,
                                    to: date,
                                  }))
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column — PSP & Notifications */}
                  <div className="space-y-5">
                    <div className="space-y-3">
                      <Label>Payment Service Providers</Label>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          "ABSA Pay",
                          "Capitec Pay",
                          "PayShap",
                          "Card Payment",
                          "EFT",
                          "Instant EFT",
                        ].map((psp) => (
                          <Label
                            key={psp}
                            htmlFor={`psp-${psp}`}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <Checkbox id={`psp-${psp}`} defaultChecked />
                            {psp}
                          </Label>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label>Notification Settings</Label>
                      <div className="space-y-3">
                        <Label
                          htmlFor="emailNotifications"
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <Checkbox id="emailNotifications" />
                          Email notifications
                        </Label>

                        <Label
                          htmlFor="smsNotifications"
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <Checkbox id="smsNotifications" />
                          SMS notifications
                        </Label>

                        <Label
                          htmlFor="webhookNotifications"
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <Checkbox id="webhookNotifications" defaultChecked />
                          Webhook notifications
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-2">
                  <Button className="flex-1 gold-button">
                    Create Payment Link
                  </Button>
                  <Button variant="outline" className="ghost-button">
                    Save as Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="manage" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Link Management</CardTitle>
                <CardDescription>
                  View and manage all your payment links
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: "PL001",
                      description: "Invoice #INV-2024-001",
                      amount: "R 2,500.00",
                      status: "Active",
                      created: "2024-01-15",
                      expires: "2024-02-15",
                      clicks: 12,
                      payments: 1,
                    },
                    {
                      id: "PL002",
                      description: "Subscription Payment",
                      amount: "R 299.00",
                      status: "Paid",
                      created: "2024-01-14",
                      expires: "2024-02-14",
                      clicks: 8,
                      payments: 1,
                    },
                    {
                      id: "PL003",
                      description: "Product Purchase",
                      amount: "R 1,250.00",
                      status: "Active",
                      created: "2024-01-13",
                      expires: "2024-02-13",
                      clicks: 25,
                      payments: 0,
                    },
                    {
                      id: "PL004",
                      description: "Service Fee",
                      amount: "R 750.00",
                      status: "Expired",
                      created: "2024-01-10",
                      expires: "2024-01-25",
                      clicks: 5,
                      payments: 0,
                    },
                  ].map((link) => (
                    <Card key={link.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-medium text-card-foreground">
                              {link.description}
                            </h4>
                            <Badge
                              variant={
                                link.status === "Paid"
                                  ? "default"
                                  : link.status === "Active"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {link.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                            <div>
                              <span className="font-medium text-foreground">
                                {link.amount}
                              </span>
                            </div>
                            <div>
                              <Clock className="h-3 w-3 inline mr-1" />
                              Expires: {link.expires}
                            </div>
                            <div>
                              <TrendingUp className="h-3 w-3 inline mr-1" />
                              {link.clicks} clicks
                            </div>
                            <div>
                              <DollarSign className="h-3 w-3 inline mr-1" />
                              {link.payments} payments
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-card-foreground">
                    Total Link Clicks
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 gold-gradient-icon" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-card-foreground">
                    2,847
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +18% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-card-foreground">
                    Conversion Rate
                  </CardTitle>
                  <BarChart3 className="h-4 w-4 gold-gradient-icon" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-card-foreground">
                    68.4%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +5.2% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-card-foreground">
                    Average Payment Time
                  </CardTitle>
                  <Clock className="h-4 w-4 gold-gradient-icon" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-card-foreground">
                    2.3 min
                  </div>
                  <p className="text-xs text-muted-foreground">
                    -0.8 min from last month
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Payment Method Performance</CardTitle>
                <CardDescription>
                  Success rates by payment service provider
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      psp: "ABSA Pay",
                      success: 96.2,
                      volume: 1247,
                      color: "bg-chart-4",
                    },
                    {
                      psp: "Capitec Pay",
                      success: 94.8,
                      volume: 892,
                      color: "bg-chart-4",
                    },
                    {
                      psp: "PayShap",
                      success: 91.5,
                      volume: 654,
                      color: "bg-chart-4",
                    },
                    {
                      psp: "Card Payment",
                      success: 89.3,
                      volume: 2156,
                      color: "bg-chart-4",
                    },
                    {
                      psp: "EFT",
                      success: 87.1,
                      volume: 423,
                      color: "bg-chart-5",
                    },
                  ].map((psp) => (
                    <div
                      key={psp.psp}
                      className="flex items-center justify-between p-3 border border-border rounded-md"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-3 w-3 rounded-full ${psp.color}`}
                        ></div>
                        <div>
                          <p className="font-medium text-card-foreground">
                            {psp.psp}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {psp.volume} transactions
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-card-foreground">
                          {psp.success}%
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Success rate
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
