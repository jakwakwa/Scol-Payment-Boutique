"use client";

import {
	ArrowLeft,
	ArrowRight,
	CheckCircle,
	CreditCard,
	Shield,
	User,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
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
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export default function EMandateOnboarding() {
	const [currentStep, setCurrentStep] = useState(1);
	const [formData, setFormData] = useState({
		// Step 1: Product Selection
		productType: "",
		subscriptionPlan: "",

		// Step 2: Contact Details
		firstName: "",
		lastName: "",
		email: "",
		phone: "",

		// Step 3: Banking Details
		bankName: "",
		accountType: "",
		accountNumber: "",
		branchCode: "",

		// Step 4: Identity Verification
		idNumber: "",
		idType: "",

		// Step 5: Confirmation
		termsAccepted: false,
		privacyAccepted: false,
	});

	const steps = [
		{ id: 1, title: "Product Selection", icon: User },
		{ id: 2, title: "Contact Details", icon: User },
		{ id: 3, title: "Banking Details", icon: CreditCard },
		{ id: 4, title: "Identity Verification", icon: Shield },
		{ id: 5, title: "Confirmation", icon: CheckCircle },
	];

	const handleNext = () => {
		if (currentStep < 5) {
			setCurrentStep(currentStep + 1);
		}
	};

	const handlePrevious = () => {
		if (currentStep > 1) {
			setCurrentStep(currentStep - 1);
		}
	};

	const handleInputChange = (field: string, value: string | boolean) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handleSubmit = () => {
		console.log("eMandate registration submitted:", formData);
		// Handle final submission
	};

	return (
		<div className="bg-gradient-to-t from-gray-950 to-stone-950/90 min-h-screen">
			<div className="flex items-center justify-center min-h-screen p-4">
				<div className="w-full max-w-4xl">
					{/* Header */}
					<div className="mb-8 text-center">
						<div className="flex items-center justify-center gap-2 mb-4">
							<User className="w-8 h-8 text-yellow-400" />
							<h1 className="text-white text-3xl font-bold">StratCol</h1>
						</div>
						<h2 className="text-white text-2xl font-semibold mb-2">
							eMandate Onboarding
						</h2>
						<p className="text-gray-300">
							Streamlined debit order registrations
						</p>
					</div>

					{/* Progress Steps */}
					<div className="flex justify-center mb-4">
						<div className="flex items-center">
							{steps.map((step, index) => (
								<div key={step.id} className="flex items-center">
									<div className="flex flex-col items-center">
										<div
											className={`w-9 h-9 rounded-full flex items-center justify-center border-2 bg-secondary text-accent-background ${currentStep >= step.id
												? "border-yellow-800 text-black bg-transparent text-yellow-600"
												: "border-yellow-900 bg-yellow-900/10 text-yellow-900/40"
												}`}
										>
											<step.icon className="w-5 h-5" />
										</div>
										<span className={`${currentStep >= step.id ? "text-yellow-600" : "text-yellow-900/40"} 	text-sm w-full mt-2 text-center font-medium`}>
											{step.title}
										</span>
									</div>
									{index < steps.length - 1 && (
										<div
											className={`w-16 h-0.5 mx-4 ${currentStep > step.id ? "bg-yellow-400" : "bg-gray-600"}`}
										/>
									)}
								</div>
							))}
						</div>
					</div>

					{/* Form Content */}
					<Card >
						<CardHeader>
							<CardTitle className="text-white text-xl">
								Step {currentStep}: {steps[currentStep - 1].title}
							</CardTitle>
							<CardDescription className="text-gray-300">
								{currentStep === 1 &&
									"Select your product and subscription plan"}
								{currentStep === 2 && "Provide your contact information"}
								{currentStep === 3 &&
									"Enter your banking details for debit orders"}
								{currentStep === 4 && "Verify your identity"}
								{currentStep === 5 && "Review and confirm your registration"}
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							{/* Step 1: Product Selection */}
							{currentStep === 1 && (
								<div className="space-y-4 py-2">
									<div className="flex flex-col gap-3">
										<Label htmlFor="productType" className="text-yellow-600/50">
											Product Type
										</Label>
										<Select
											value={formData.productType}
											onValueChange={(value) =>
												handleInputChange("productType", value)
											}
										>
											<SelectTrigger className="stratcol-input">
												<SelectValue placeholder="Select product type" />
											</SelectTrigger>
											<SelectContent className="bg-stone-600/10 border-gray-600 backdrop-blur-sm">
												<SelectItem
													value="client-service"
													className="text-white hover:bg-gray-700"
												>
													Client Service Testing
												</SelectItem>
												<SelectItem
													value="training"
													className="text-white hover:bg-gray-700"
												>
													StratCol Training
												</SelectItem>
												<SelectItem
													value="consulting"
													className="text-white hover:bg-gray-700"
												>
													Consulting Services
												</SelectItem>
											</SelectContent>
										</Select>
									</div>
									<div className="flex flex-col gap-3">
										<Label htmlFor="subscriptionPlan" className="text-yellow-600/50">
											Subscription Plan
										</Label>
										<Select
											value={formData.subscriptionPlan}
											onValueChange={(value) =>
												handleInputChange("subscriptionPlan", value)
											}
										>
											<SelectTrigger className="stratcol-input">
												<SelectValue placeholder="Select subscription plan" />
											</SelectTrigger>
											<SelectContent className="bg-stone-900/10 border-gray-600 backdrop-blur-md">
												<SelectItem
													value="basic"
													className="text-white hover:bg-gray-700"
												>
													Basic Plan - R299/month
												</SelectItem>
												<SelectItem
													value="professional"
													className="text-white hover:bg-gray-700"
												>
													Professional Plan - R599/month
												</SelectItem>
												<SelectItem
													value="enterprise"
													className="text-white hover:bg-gray-700"
												>
													Enterprise Plan - R999/month
												</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>
							)}

							{/* Step 2: Contact Details */}
							{currentStep === 2 && (
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div>
										<Label htmlFor="firstName" className="text-white">
											First Name
										</Label>
										<Input
											id="firstName"
											className="stratcol-input"
											value={formData.firstName}
											onChange={(e) =>
												handleInputChange("firstName", e.target.value)
											}
											placeholder="Enter your first name"
										/>
									</div>
									<div>
										<Label htmlFor="lastName" className="text-white">
											Last Name
										</Label>
										<Input
											id="lastName"
											className="stratcol-input"
											value={formData.lastName}
											onChange={(e) =>
												handleInputChange("lastName", e.target.value)
											}
											placeholder="Enter your last name"
										/>
									</div>
									<div>
										<Label htmlFor="email" className="text-white">
											Email Address
										</Label>
										<Input
											id="email"
											type="email"
											className="stratcol-input"
											value={formData.email}
											onChange={(e) =>
												handleInputChange("email", e.target.value)
											}
											placeholder="Enter your email address"
										/>
									</div>
									<div>
										<Label htmlFor="phone" className="text-white">
											Phone Number
										</Label>
										<Input
											id="phone"
											className="stratcol-input"
											value={formData.phone}
											onChange={(e) =>
												handleInputChange("phone", e.target.value)
											}
											placeholder="Enter your phone number"
										/>
									</div>
								</div>
							)}

							{/* Step 3: Banking Details */}
							{currentStep === 3 && (
								<div className="space-y-4">
									<div>
										<Label htmlFor="bankName" className="text-white">
											Bank Name
										</Label>
										<Select
											value={formData.bankName}
											onValueChange={(value) =>
												handleInputChange("bankName", value)
											}
										>
											<SelectTrigger className="stratcol-input">
												<SelectValue placeholder="Select your bank" />
											</SelectTrigger>
											<SelectContent className="bg-gray-800 border-gray-600">
												<SelectItem
													value="absa"
													className="text-white hover:bg-gray-700"
												>
													ABSA Bank
												</SelectItem>
												<SelectItem
													value="fnb"
													className="text-white hover:bg-gray-700"
												>
													First National Bank
												</SelectItem>
												<SelectItem
													value="standard"
													className="text-white hover:bg-gray-700"
												>
													Standard Bank
												</SelectItem>
												<SelectItem
													value="nedbank"
													className="text-white hover:bg-gray-700"
												>
													Nedbank
												</SelectItem>
												<SelectItem
													value="capitec"
													className="text-white hover:bg-gray-700"
												>
													Capitec Bank
												</SelectItem>
											</SelectContent>
										</Select>
									</div>
									<div>
										<Label htmlFor="accountType" className="text-white">
											Account Type
										</Label>
										<Select
											value={formData.accountType}
											onValueChange={(value) =>
												handleInputChange("accountType", value)
											}
										>
											<SelectTrigger className="stratcol-input">
												<SelectValue placeholder="Select account type" />
											</SelectTrigger>
											<SelectContent className="bg-gray-800 border-gray-600">
												<SelectItem
													value="current"
													className="text-white hover:bg-gray-700"
												>
													Current Account
												</SelectItem>
												<SelectItem
													value="savings"
													className="text-white hover:bg-gray-700"
												>
													Savings Account
												</SelectItem>
												<SelectItem
													value="cheque"
													className="text-white hover:bg-gray-700"
												>
													Cheque Account
												</SelectItem>
											</SelectContent>
										</Select>
									</div>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div>
											<Label htmlFor="accountNumber" className="text-white">
												Account Number
											</Label>
											<Input
												id="accountNumber"
												className="stratcol-input"
												value={formData.accountNumber}
												onChange={(e) =>
													handleInputChange("accountNumber", e.target.value)
												}
												placeholder="Enter account number"
											/>
										</div>
										<div>
											<Label htmlFor="branchCode" className="text-white">
												Branch Code
											</Label>
											<Input
												id="branchCode"
												className="stratcol-input"
												value={formData.branchCode}
												onChange={(e) =>
													handleInputChange("branchCode", e.target.value)
												}
												placeholder="Enter branch code"
											/>
										</div>
									</div>
								</div>
							)}

							{/* Step 4: Identity Verification */}
							{currentStep === 4 && (
								<div className="space-y-4">
									<div>
										<Label htmlFor="idType" className="text-white">
											ID Type
										</Label>
										<Select
											value={formData.idType}
											onValueChange={(value) =>
												handleInputChange("idType", value)
											}
										>
											<SelectTrigger className="stratcol-input">
												<SelectValue placeholder="Select ID type" />
											</SelectTrigger>
											<SelectContent className="bg-gray-800 border-gray-600">
												<SelectItem
													value="sa-id"
													className="text-white hover:bg-gray-700"
												>
													South African ID
												</SelectItem>
												<SelectItem
													value="passport"
													className="text-white hover:bg-gray-700"
												>
													Passport
												</SelectItem>
												<SelectItem
													value="drivers-license"
													className="text-white hover:bg-gray-700"
												>
													Driver's License
												</SelectItem>
											</SelectContent>
										</Select>
									</div>
									<div>
										<Label htmlFor="idNumber" className="text-white">
											ID Number
										</Label>
										<Input
											id="idNumber"
											className="stratcol-input"
											value={formData.idNumber}
											onChange={(e) =>
												handleInputChange("idNumber", e.target.value)
											}
											placeholder="Enter your ID number"
										/>
									</div>
									<div className="bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-4">
										<p className="text-yellow-200 text-sm">
											<Shield className="w-4 h-4 inline mr-2" />
											Your identity information is encrypted and stored securely
											in compliance with POPIA regulations.
										</p>
									</div>
								</div>
							)}

							{/* Step 5: Confirmation */}
							{currentStep === 5 && (
								<div className="space-y-6">
									<div className="bg-gray-700/50 rounded-lg p-6 space-y-4">
										<h3 className="text-white font-semibold text-lg">
											Registration Summary
										</h3>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
											<div>
												<span className="text-gray-400">Product:</span>
												<span className="text-white ml-2">
													{formData.productType}
												</span>
											</div>
											<div>
												<span className="text-gray-400">Plan:</span>
												<span className="text-white ml-2">
													{formData.subscriptionPlan}
												</span>
											</div>
											<div>
												<span className="text-gray-400">Name:</span>
												<span className="text-white ml-2">
													{formData.firstName} {formData.lastName}
												</span>
											</div>
											<div>
												<span className="text-gray-400">Email:</span>
												<span className="text-white ml-2">
													{formData.email}
												</span>
											</div>
											<div>
												<span className="text-gray-400">Bank:</span>
												<span className="text-white ml-2">
													{formData.bankName}
												</span>
											</div>
											<div>
												<span className="text-gray-400">Account:</span>
												<span className="text-white ml-2">
													***{formData.accountNumber.slice(-4)}
												</span>
											</div>
										</div>
									</div>

									<div className="space-y-4">
										<div className="flex items-start space-x-3">
											<Checkbox
												id="terms"
												checked={formData.termsAccepted}
												onCheckedChange={(checked) =>
													handleInputChange("termsAccepted", checked as boolean)
												}
											/>
											<Label
												htmlFor="terms"
												className="text-white text-sm leading-relaxed"
											>
												I agree to the Terms and Conditions and authorize
												StratCol to process debit orders from my account
											</Label>
										</div>
										<div className="flex items-start space-x-3">
											<Checkbox
												id="privacy"
												checked={formData.privacyAccepted}
												onCheckedChange={(checked) =>
													handleInputChange(
														"privacyAccepted",
														checked as boolean,
													)
												}
											/>
											<Label
												htmlFor="privacy"
												className="text-white text-sm leading-relaxed"
											>
												I acknowledge that I have read and understood the
												Privacy Policy
											</Label>
										</div>
									</div>
								</div>
							)}

							{/* Navigation Buttons */}
							<div className="flex justify-between pt-6">
								<Button
									variant="outline"
									onClick={handlePrevious}
									disabled={currentStep === 1}
									className="flex items-center gap-2 bg-transparent"
								>
									<ArrowLeft className="w-4 h-4" />
									Previous
								</Button>

								{currentStep < 5 ? (
									<Button
										onClick={handleNext}
										className="flex items-center gap-2"
									>
										Next
										<ArrowRight className="w-4 h-4" />
									</Button>
								) : (
									<Button
										onClick={handleSubmit}
										disabled={
											!formData.termsAccepted || !formData.privacyAccepted
										}
										className="flex items-center gap-2"
									>
										<CheckCircle className="w-4 h-4" />
										Complete Registration
									</Button>
								)}
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
