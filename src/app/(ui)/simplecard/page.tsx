import SimpleCard from '@/components/ReusableUI/SimpleCard/SimpleCard';
import { simpleCardConfig1 } from '@/config/Card/Simple-card/config1';
import { simpleCardConfig2 } from '@/config/Card/Simple-card/config2';
import { simpleCardConfig3 } from '@/config/Card/Simple-card/config3';
import { simpleCardConfig4 } from '@/config/Card/Simple-card/config4';
import { simpleCardConfig5 } from '@/config/Card/Simple-card/config5';
import { simpleCardConfig6 } from '@/config/Card/Simple-card/config6';
import { simpleCardConfig7 } from '@/config/Card/Simple-card/config7';

export default function SimpleCardPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
                <SimpleCard config={simpleCardConfig1} />
                <SimpleCard config={simpleCardConfig2} />
                <SimpleCard config={simpleCardConfig3} />
                <SimpleCard config={simpleCardConfig4} />
                <SimpleCard config={simpleCardConfig5} />
                <SimpleCard config={simpleCardConfig6} />
                <SimpleCard config={simpleCardConfig7} />
            </div>
        </div>
    );
}