// client/src/pages/Resources.jsx

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../components/ui/card';
import { ExternalLink } from 'lucide-react'; // Assuming you have lucide-react installed

const resourceCategories = [
    {
        title: "Nonprofits working to empower women across the globe 🆘",
        description: "Nonprofits working on the frontlines to empower women across the globe",
        resources: [
            { name: "Girl Effect", link: "https://www.girleffect.org/" },
            { name: "Global Fund for Women", link: "https://www.globalfundforwomen.org/"},
            { name: "UN Women", link: "https://www.unwomen.org/en" },
            { name: "Women for Women International", link: "https://www.womenforwomen.org/" },
        ],
    },
    {
        title: "Therapy & Counseling Services 🛋️",
        description: "Find a mental health professional or online platform.",
        resources: [
            { name: "Psychology Today Find a Therapist", link: "https://www.psychologytoday.com/us/therapists" },
            { name: "BetterHelp (Online Therapy)", link: "https://www.betterhelp.com" },
            { name: "NAMI (National Alliance on Mental Illness)", link: "https://www.nami.org/help" },
        ],
    },
    {
        title: "General Mental Health Information 🧠",
        description: "Reliable educational resources.",
        resources: [
            { name: "Mental Health America (MHA)", link: "https://www.mhanational.org" },
            { name: "Mayo Clinic - Mental Health", link: "https://www.mayoclinic.org/healthy-lifestyle/mental-health" },
        ],
    },
];

export default function Resources() {
    return (
        <div className="py-8 max-w-4xl mx-auto px-4">
            <h1 className="text-4xl font-extrabold text-center mb-4 text-indigo-700">
                SafeSpace Resources 💡
            </h1>
            <p className="text-center text-lg text-gray-600 mb-10">
                You are not alone. Please use these resources for professional support and information.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resourceCategories.map((category) => (
                    <Card key={category.title} className="hover:shadow-lg transition-shadow duration-300">
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <span>{category.title}</span>
                            </CardTitle>
                            <CardDescription>{category.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {category.resources.map((resource) => (
                                <a 
                                    key={resource.name}
                                    href={resource.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex justify-between items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-200 group"
                                >
                                    <span className="font-medium">
                                        {resource.display || resource.name}
                                    </span>
                                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-indigo-600"/>
                                </a>
                            ))}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}