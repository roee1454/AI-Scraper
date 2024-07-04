import MainForm from "@/components/custom/MainForm";

export default function MainPage() {
    return <div className="flex flex-col justify-center items-center gap-y-6 md:gap-y-12 py-12 md:py-24">
        <div className="font-bold text-2xl md:text-5xl">
            <span className="text-foreground">Get The Best For</span>
            <span className="text-primary">{" "}Less</span>
        </div>
        <MainForm />
    </div>
};