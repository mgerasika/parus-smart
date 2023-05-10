import { EPageType } from '@/api/enum';
import { apiHooks } from '@/api/hooks';
import { Layout } from '@/components/layout.component';
import { Page } from '@/components/page.component';
import React from 'react';

export default function Documents(): JSX.Element {
    const { data: pages, isLoading } = apiHooks.page.useGatPages();
    const data = pages?.items?.find((p) => p.type == EPageType.Documents);
    return (
        <Layout title={data?.title || ''}>
            {data && (
                <Page
                    isLoading={isLoading}
                    showDivider={false}
                    content={data.content}
                    dateObj={undefined}
                    id={data.id}
                    title={undefined}
                />
            )}
            {/* <h2 className="section-heading">Reaching for the Stars</h2>
                            <p>
                                As we got further and further away, it [the Earth] diminished in size. Finally it shrank to
                                the size of a marble, the most beautiful you can imagine. That beautiful, warm, living object
                                looked so fragile, so delicate, that if you touched it with a finger it would crumble and
                                fall apart. Seeing this has to change a man.
                            </p>
                            <a href="#!">
                                <img className="img-fluid" src="assets/img/post-sample-image.jpg" alt="..." />
                            </a>
                            <span className="caption text-muted">
                                To go places and do things that have never been done before – that’s what living is all
                                about.
                            </span>
                            <p>
                                Space, the final frontier. These are the voyages of the Starship Enterprise. Its five-year
                                mission: to explore strange new worlds, to seek out new life and new civilizations, to boldly
                                go where no man has gone before.
                            </p>
                            <p>
                                As I stand out here in the wonders of the unknown at Hadley, I sort of realize there’s a
                                fundamental truth to our nature, Man must explore, and this is exploration at its greatest.
                            </p>
                            <p>
                                Placeholder text by
                                <a href="http://spaceipsum.com/">Space Ipsum</a>· Images by
							<a href="https://www.flickr.com/photos/nasacommons/">NASA on The Commons</a>*/}
        </Layout>
    );
}
